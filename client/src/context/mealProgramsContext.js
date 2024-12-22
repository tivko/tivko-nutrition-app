import React, { createContext, useReducer, useContext } from "react";

const MealProgramsContext = createContext();

const SET_GOALS = "SET_GOALS";
const SET_DATES = "SET_DATES";
const SET_STATUS = "SET_STATUS";
const SET_SORT_OPTION = "SET_SORT_OPTION";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_GOALS:
      return {
        ...state,
        goals: action.payload,
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case SET_DATES:
      return {
        ...state,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };
    case SET_SORT_OPTION:
      return {
        ...state,
        sortOption: action.payload,
      };
    default:
      return state;
  }
};

export const MealProgramsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    goals: [],
    startDate: null,
    endDate: null,
    status: [],
    sortOption: "asc",
  });
  return (
    <MealProgramsContext.Provider value={{ state, dispatch }}>
      {children}
    </MealProgramsContext.Provider>
  );
};

export const useMealProgramsContext = () => useContext(MealProgramsContext);

export const setGoals = (goals) => ({ type: SET_GOALS, payload: goals });

export const setDates = (startDate, endDate) => ({
  type: SET_DATES,
  payload: { startDate, endDate },
});

export const setSort = (sortOption) => ({
  type: SET_SORT_OPTION,
  payload: sortOption,
});

export const setStatus = (status) => ({
  type: SET_STATUS,
  payload: status,
});
