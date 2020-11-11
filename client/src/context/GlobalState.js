import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import {
  GET_SCORE_DATA,
  GET_USERS,
  GET_USER,
  REMOVE_USER,
  GET_WORLD_RANKINGS,
  SET_LOADING,
  GET_ENTRIES,
} from "./Types";
import axios from "axios";
import { db, firebase } from "../firebase";
import * as moment from "moment";

const initialState = {
  users: [],
  loggedInUser: {},
  data: [],
  worldRankings: [],
  entries: [],
  loading: true,
  updated: "",
  start: moment("2020-11-12T12:00:00.000"),
  selections: [
    { selectionOneID: "", selectionTwoID: "", selectionThreeID: "" },
  ],
};

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
      `https://golf-leaderboard-data.p.rapidapi.com/leaderboard/263`,
      requestOptions
    );
    dispatch({
      type: GET_SCORE_DATA,
      payload: res.data,
    });
  };
  // const getScoreDataWScores = async () => {
  //   setLoading();
  //   const requestOptions = {
  //     method: "GET",
  //     headers: {
  //       "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY2,
  //       "x-rapidapi-host": "golf-leaderboard-data.p.rapidapi.com",
  //     },
  //   };
  //   try {
  //     const res = await axios.get(
  //       `https://golf-leaderboard-data.p.rapidapi.com/scorecard/220/101017`,
        
  //       requestOptions
  //     );
  //     //console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   // dispatch({
  //   //   type: GET_SCORE_DATA,
  //   //   payload: res.data,
  //   // });
  // };
  const getEntries = async () => {
    setLoading();
    const requestOptions = {
      method: "GET",
      headers: {
        "x-rapidapi-host": "golf-leaderboard-data.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };

    const res = await axios.get(
      `https://golf-leaderboard-data.p.rapidapi.com/entry-list/263`,
      requestOptions
    );
    dispatch({
      type: GET_ENTRIES,
      payload: res.data.results.entry_list,
    });
  };
  const getWorldRankings = async () => {
    setLoading();
    const requestOptions = {
      method: "GET",
      headers: {
        "x-rapidapi-host": "golf-leaderboard-data.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };

    const res = await axios.get(
      `https://golf-leaderboard-data.p.rapidapi.com/world-rankings`,
      requestOptions
    );
    dispatch({
      type: GET_WORLD_RANKINGS,
      payload: res.data,
    });
  };

  const getUsers = async () => {
    setLoading();
    const snapshot = await db.collection("users").get();
    const res = snapshot.docs.map((doc) => doc.data());
    dispatch({
      type: GET_USERS,
      payload: res,
    });
  };

  const getUser = async (email) => {
    setLoading();
    const user = await state.users.filter((u) => u.email.toLowerCase() === email.toLowerCase());
    console.log('got user')
    dispatch({
      type: GET_USER,
      payload: user,
    });
  };

  const removeUser = () => {
    setLoading();
    dispatch({
      type: REMOVE_USER,
    });
  };

  const addUser = async (name, email) => {
    setLoading();
    db.collection("users").add({
      name: name,
      email: email,
    });
    const user = state.users.filter((u) => u.email.toLowerCase() === email.toLowerCase());
    dispatch({
      type: GET_USER,
      payload: user,
    });
  };

  const matchSelection = (id) => {
    const leaderboard = state.data.results.leaderboard;
    const player = leaderboard.filter((p) => p.player_id === parseInt(id));
    return player;
  };

  const addSelections = async (
    email,
    golferOne,
    golferOneID,
    golferTwo,
    golferTwoID,
    golferThree,
    golferThreeID,
    golferFour,
    golferFourID
  ) => {
    setLoading();
    await db
      .collection("users")
      .where("email", "==", email)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const docId = doc.id;

          db.collection("users")
            .doc(docId)
            .update({
              selections: firebase.firestore.FieldValue.arrayUnion({
                golferOne: matchSelection(golferOneID)[0],
                golferTwo: matchSelection(golferTwoID)[0],
                golferThree: matchSelection(golferThreeID)[0],
                golferFour: matchSelection(golferFourID)[0],
              }),
            });
        });
      });

    const snapshot = await db.collection("users").get();

    const res = snapshot.docs.map((doc) => doc.data());
    dispatch({
      type: GET_USERS,
      payload: res,
    });
  };

  const setLoading = () => dispatch({ type: SET_LOADING });
  return (
    <GlobalContext.Provider
      value={{
        player: state.player,
        users: state.users,
        entries: state.entries,
        loggedInUser: state.loggedInUser,
        data: state.data,
        worldRankings: state.worldRankings,
        loading: state.loading,
        selections: state.selections,
        start: state.start,
        getScoreData,
        setLoading,
        getUsers,
        getEntries,
        addUser,
        removeUser,
        getWorldRankings,
        getUser,
        addSelections,
        matchSelection,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
