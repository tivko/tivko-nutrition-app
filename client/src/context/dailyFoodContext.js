import React, { createContext, useReducer, useContext } from "react";

const DailyFoodContext = createContext();

const SET_BREAKFAST = "SET_BREAKFAST";
const SET_LUNCH = "SET_LUNCH";
const SET_DINNER = "SET_DINNER";
const SET_SNACK1 = "SET_SNACK1";
const SET_SNACK2 = "SET_SNACK2";
const SET_MEALNUMBERS = "SET_MEALNUMBERS";
const SET_CONSUMED_INFO = "SET_CONSUMED_INFO";
const ADD_TO_DAILY_ITEMS = "ADD_TO_DAILY_ITEMS";
const REMOVE_FROM_DAILY_ITEMS = "REMOVE_FROM_DAILY_ITEMS";
const UPDATE_INFO = "UPDATE_INFO";
const REFRESH_ALL = "REFRESH_ALL";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_BREAKFAST:
      return { ...state, breakfast: action.payload };
    case SET_LUNCH:
      return { ...state, lunch: action.payload };
    case SET_DINNER:
      return { ...state, dinner: action.payload };
    case SET_SNACK1:
      return { ...state, morningSnack: action.payload };
    case SET_SNACK2:
      return { ...state, afternoonSnack: action.payload };
    case SET_MEALNUMBERS:
      return { ...state, mealNumbers: action.payload };
    case SET_CONSUMED_INFO:
      return { ...state, consumedInfo: action.payload };
    case ADD_TO_DAILY_ITEMS:
      return {
        ...state,
        [action.payload.mealType]: {
          ...state[action.payload.mealType],
          items: [...state[action.payload.mealType].items, action.payload.item],
        },
      };
    case REMOVE_FROM_DAILY_ITEMS:
      const mealType = action.payload.mealType;
      const idToRemove = action.payload.id;
      const mealItems = state[mealType]?.items || [];

      const indexToRemove = mealItems.findIndex(
        (item) => item.id === idToRemove
      );

      if (indexToRemove !== -1) {
        const updatedItems = [
          ...mealItems.slice(0, indexToRemove),
          ...mealItems.slice(indexToRemove + 1),
        ];

        return {
          ...state,
          [mealType]: { ...state[mealType], items: updatedItems },
        };
      } else {
        return state;
      }
    case UPDATE_INFO: // Редуктор для оновлення info
      return {
        ...state,
        [action.payload.mealType]: {
          ...state[action.payload.mealType],
          info: action.payload.info,
        },
      };
    case REFRESH_ALL:
      return {
        breakfast: { info: state.breakfast.info, items: [] },
        lunch: { info: state.lunch.info, items: [] },
        dinner: { info: state.dinner.info, items: [] },
        morningSnack: { info: state.morningSnack.info, items: [] },
        afternoonSnack: { info: state.afternoonSnack.info, items: [] },
        consumedInfo: { calories: 0, carbohydrates: 0, fat: 0, proteins: 0 },
        mealNumbers: 3,
      };
    default:
      return state;
  }
};

export const DailyFoodProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    breakfast: { info: {}, items: [] },
    lunch: { info: {}, items: [] },
    dinner: { info: {}, items: [] },
    morningSnack: { info: {}, items: [] },
    afternoonSnack: { info: {}, items: [] },
    consumedInfo: {
      dailyCalories: 0,
      dailyCarbohydrates: 0,
      dailyFat: 0,
      dailyProteins: 0,
      mealNumbers: 3,
    },
  });

  return (
    <DailyFoodContext.Provider value={{ state, dispatch }}>
      {children}
    </DailyFoodContext.Provider>
  );
};

export const useDailyFoodContext = () => useContext(DailyFoodContext);

export const addToDailyItems = (mealType, item) => ({
  type: ADD_TO_DAILY_ITEMS,
  payload: { mealType, item },
});

export const removeFromDailyItems = (mealType, id) => ({
  type: REMOVE_FROM_DAILY_ITEMS,
  payload: { mealType, id },
});

export const setBreakfast = (meal) => ({
  type: SET_BREAKFAST,
  payload: meal,
});

export const setLunch = (meal) => ({
  type: SET_LUNCH,
  payload: meal,
});

export const setNumberOfMeals = (numbers) => ({
  type: SET_MEALNUMBERS,
  payload: numbers,
});

export const setDinner = (meal) => ({
  type: SET_DINNER,
  payload: meal,
});

export const setSnack1 = (snack) => ({
  type: SET_SNACK1,
  payload: snack,
});

export const setSnack2 = (snack) => ({
  type: SET_SNACK2,
  payload: snack,
});

export const setConsumedInfo = (info) => ({
  type: SET_CONSUMED_INFO,
  payload: info,
});

export const updateInfo = (mealType, info) => ({
  type: UPDATE_INFO,
  payload: { mealType, info },
});

export const refreshAll = () => ({
  type: REFRESH_ALL,
});
