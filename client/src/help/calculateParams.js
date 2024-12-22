export const countBMR = (
  gender,
  numericWeight,
  numericAge,
  numericHeight,
  bodyFat
) => {
  let res = 0;
  if (!isNaN(bodyFat)) {
    //  Katch-McArdle
    const lbm = (numericWeight * (100 - bodyFat)) / 100;
    res = 370 + 21.6 * lbm;
  } else {
    //  Mifflin-St Jeor Equation
    if (gender === "female") {
      res = 10 * numericWeight + 6.25 * numericHeight - 5 * numericAge - 161;
    } else {
      res = 10 * numericWeight + 6.25 * numericHeight - 5 * numericAge + 5;
    }
  }
  return res;
};

export const countCaloriesWithGoal = (bmr, activity, goal) => {
  const bareCal = Math.round(bmr * activity.coefficient);
  if (goal?.value !== null && goal?.value !== undefined) {
    return bareCal + goal.value;
  } else if (goal?.coefficient !== null && goal?.coefficient !== undefined) {
    const caloriesReduction = bareCal * goal.coefficient;
    return bareCal - caloriesReduction;
  } else {
    return bareCal;
  }
};

export const countPCF = (
  cal,
  proteinPercentage,
  carbsPercentage,
  fatPercentage
) => {
  const proteinGrams = Math.round((cal * (proteinPercentage / 100)) / 4.0);
  const carbsGrams = Math.round((cal * (carbsPercentage / 100)) / 4.0);
  const fatGrams = Math.round((cal * (fatPercentage / 100)) / 9.0);
  return { proteinGrams, carbsGrams, fatGrams };
};

export const getMealCoefficientDistribution = (numberOfMeals) => {
  let mealDistribution;
  if (numberOfMeals == "3") {
    mealDistribution = {
      breakfast: { min: 0.3, max: 0.35 },
      lunch: { min: 0.35, max: 0.4 },
      dinner: { min: 0.25, max: 0.35 },
    };
  } else if (numberOfMeals == "4") {
    mealDistribution = {
      breakfast: { min: 0.25, max: 0.3 },
      morningSnack: { min: 0.05, max: 0.1 },
      lunch: { min: 0.35, max: 0.4 },
      dinner: { min: 0.25, max: 0.3 },
    };
  } else if (numberOfMeals == "5") {
    mealDistribution = {
      breakfast: { min: 0.25, max: 0.3 },
      morningSnack: { min: 0.05, max: 0.1 },
      lunch: { min: 0.35, max: 0.4 },
      afternoonSnack: { min: 0.05, max: 0.1 },
      dinner: { min: 0.15, max: 0.2 },
    };
  }
  for (let meal in mealDistribution) {
    const { min, max } = mealDistribution[meal];
    mealDistribution[meal].average = (min + max) / 2;
  }
  return mealDistribution;
};

export const getMealDistribution = (totalInfo, distribution) => {
  const meals = {};

  Object.keys(distribution).forEach((meal) => {
    const { max, min, average } = distribution[meal];
    meals[meal] = {
      calories: {
        min: Math.round(totalInfo.calories * min),
        max: Math.round(totalInfo.calories * max),
        average: Math.round(totalInfo.calories * average),
      },
      carbohydrates: {
        min: Math.round(totalInfo.carbohydrates * min),
        max: Math.round(totalInfo.carbohydrates * max),
        average: Math.round(totalInfo.carbohydrates * average),
      },
      fat: {
        min: Math.round(totalInfo.fat * min),
        max: Math.round(totalInfo.fat * max),
        average: Math.round(totalInfo.fat * average),
      },
      proteins: {
        min: Math.round(totalInfo.proteins * min),
        max: Math.round(totalInfo.proteins * max),
        average: Math.round(totalInfo.proteins * average),
      },
    };
  });

  return meals;
};

export const countMealsCalories = (
  mealDistribution,
  totalCalories,
  totalProtein,
  totalCarbs,
  totalFat
) => {
  const mealCalories = {};

  Object.keys(mealDistribution).forEach((meal) => {
    const { min, max } = mealDistribution[meal];
    const minCalories = Math.round(min * totalCalories);
    const maxCalories = Math.round(max * totalCalories);
    const averageCalories = Math.round((minCalories + maxCalories) / 2);

    const minProtein = Math.round(min * totalProtein);
    const maxProtein = Math.round(max * totalProtein);
    const averageProtein = Math.round((minProtein + maxProtein) / 2);

    const minCarbs = Math.round(min * totalCarbs);
    const maxCarbs = Math.round(max * totalCarbs);
    const averageCarbs = Math.round((minCarbs + maxCarbs) / 2);

    const minFat = Math.round(min * totalFat);
    const maxFat = Math.round(max * totalFat);
    const averageFat = Math.round((minFat + maxFat) / 2);

    mealCalories[meal] = {
      minCalories,
      maxCalories,
      averageCalories,
      minProtein,
      maxProtein,
      averageProtein,
      minCarbs,
      maxCarbs,
      averageCarbs,
      minFat,
      maxFat,
      averageFat,
    };
  });

  return mealCalories;
};

export const caloriesIntoKJ = (cal) => {
  return Math.round(cal * 4.187);
};

export const countAll = (
  gender,
  numericWeight,
  numericAge,
  numericHeight,
  bodyFat,
  activity,
  goal,
  expectedWeight,
  macros
) => {
  const BMR = countBMR(
    gender,
    numericWeight,
    numericAge,
    numericHeight,
    bodyFat
  );

  const calories = Math.round(countCaloriesWithGoal(BMR, activity, goal));
  const pcf = countPCF(calories, macros.protein, macros.carbs, macros.fat);
  const kJ = caloriesIntoKJ(calories);
  let weeks;
  if (expectedWeight != numericWeight) {
    weeks = calculateTimeToTargetWeight(
      expectedWeight,
      numericWeight,
      goal.weightChangePerWeek
    );
  } else {
    weeks = null;
  }

  return { BMR, calories, pcf, kJ, weeks };
};

const calculateTimeToTargetWeight = (
  currentWeight,
  targetWeight,
  weightChangePerWeek
) => {
  const weightDifference = Math.abs(currentWeight - targetWeight);
  const weeksNeeded = weightDifference / weightChangePerWeek;
  return isFinite(weeksNeeded) ? Math.ceil(weeksNeeded) : null;
};
