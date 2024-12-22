import React, { createContext, useReducer, useContext } from "react";

const AppContext = createContext();

const SET_USER = "SET_USER";
const SET_USER_ID = "SET_USER_ID";
const SET_TOKEN = "SET_TOKEN";
const SET_TEMP_ID = "SET_TEMP_ID";
const SET_REG_DATA = "SET_REG_DATA";
const SET_MEAL_PROGRAM = "SET_MEAL_PROGRAM";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_USER_ID:
      return { ...state, id: action.payload };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SET_TEMP_ID:
      return { ...state, sub: action.payload };
    case SET_MEAL_PROGRAM:
      return { ...state, mealProgram: action.payload };
    case SET_REG_DATA:
      return { ...state, regData: action.payload };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    id: null,
    token: null,
    sub: null,
    mealProgram: null,
    regData: {},
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);

export const setUser = (user) => ({ type: SET_USER, payload: user });
export const setUserId = (id) => ({ type: SET_USER_ID, payload: id });
export const setToken = (token) => ({ type: SET_TOKEN, payload: token });
export const setTempId = (sub) => ({ type: SET_TEMP_ID, payload: sub });
export const setMealProgram = (mealProgram) => ({
  type: SET_MEAL_PROGRAM,
  payload: mealProgram,
});
export const setRegData = (regData) => ({
  type: SET_REG_DATA,
  payload: regData,
});
