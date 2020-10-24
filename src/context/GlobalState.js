import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import { GET_SCORE_DATA } from "./Types";
import axios from "axios";

const initialState = { player: "COnor", data: [], loading: true };

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getScoreData = async () => {
    setLoading();
    const requestOptions = {
      method: "GET",
      headers: {
        "x-rapidapi-host": "golf-leaderboard-data.p.rapidapi.com",
        "x-rapidapi-key": "f68402c7b0msh08f5e0df402ede4p12f7eajsn43496a3122b5",
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

  const setLoading = () => dispatch({ type: "" });
  return (
    <GlobalContext.Provider
      value={{
        player: state.player,
        data: state.data,
        loading: state.loading,
        getScoreData,
        setLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
