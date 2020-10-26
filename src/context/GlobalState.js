import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import { GET_SCORE_DATA, GET_USERS } from "./Types";
import axios from "axios";
import { db } from "../firebase";

const initialState = { users: [], data: [], loading: true };

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getScoreData = async () => {
    setLoading();
    const requestOptions = {
      method: "GET",
      headers: {
        "x-rapidapi-host": "golf-leaderboard-data.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };

    const res = await axios.get(
      `https://golf-leaderboard-data.p.rapidapi.com/leaderboard/217`,
      requestOptions
    );
    dispatch({
      type: GET_SCORE_DATA,
      payload: res.data,
    });
  };

  const getUsers = async () => {
    setLoading();
    const snapshot = await await db.collection("users").get();
    
    const res = snapshot.docs.map((doc) => doc.data());
    dispatch({
      type: GET_USERS,
      payload: res,
    });
  };

  const setLoading = () => dispatch({ type: "" });
  return (
    <GlobalContext.Provider
      value={{
        player: state.player,
        users: state.users,
        data: state.data,
        loading: state.loading,
        getScoreData,
        setLoading,
        getUsers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
