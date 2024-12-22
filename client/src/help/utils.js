import moment from "moment";
export const countItems = (arr) => {
  const counts = {};
  arr.forEach((item) => {
    counts[item.id] = counts[item.id] ? counts[item.id] + 1 : 1;
  });
  return counts;
};

export const filterData = (
  originalData,
  search,
  selectedItems,
  dailyRecomendation
) => {
  let filteredData = originalData;

  if (search !== "") {
    filteredData = filteredData.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (selectedItems.length > 0) {
    filteredData = filteredData.filter((item) =>
      item.categories.some((category) => selectedItems.includes(category.id))
    );
  }

  if (dailyRecomendation?.dish !== undefined && filteredData !== null) {
    filteredData = filteredData.filter((item) => {
      const meetsCalories =
        dailyRecomendation.calories !== undefined &&
        dailyRecomendation.calories >= 0
          ? item.calories <= dailyRecomendation.calories
          : true;
      const meetsCarbs =
        dailyRecomendation.carbohydrates !== undefined &&
        dailyRecomendation.carbohydrates >= 0
          ? item.carbohydrates <= dailyRecomendation.carbohydrates
          : true;
      const meetsFat =
        dailyRecomendation.fat !== undefined && dailyRecomendation.fat >= 0
          ? item.fat <= dailyRecomendation.fat
          : true;
      const meetsProteins =
        dailyRecomendation.proteins !== undefined &&
        dailyRecomendation.proteins >= 0
          ? item.protein <= dailyRecomendation.proteins
          : true;
      return meetsCalories && meetsCarbs && meetsFat && meetsProteins;
    });
  }
  return filteredData;
};

export const formatDate = (date) => {
  return date ? moment(date).format("DD-MM-YYYY") : "-";
};

export const formatYearFirst = (date) => {
  return date ? moment(date).format("YYYY-MM-DD") : "-";
};

export const filterAndCount = (dishes) => {
  const result = {};
  dishes.forEach((item) => {
    const mealType = item.mealType;
    if (!result[mealType]) {
      result[mealType] = [];
    }
    const existingDish = result[mealType].find(
      (dish) => dish.dish.title === item.dish.title
    );
    if (existingDish) {
      existingDish.count++;
    } else {
      result[mealType].push({ count: 1, dish: item.dish });
    }
  });
  return result;
};

const normalizeToUTC = (date) => {
  const d = new Date(date);
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
};

export const compareDatesWithoutTime = (date1, date2) => {
  const d1 = normalizeToUTC(date1);
  const d2 = normalizeToUTC(date2);
  if (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  ) {
    return true;
  } else {
    return false;
  }
};
