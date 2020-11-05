import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import {
  GET_SCORE_DATA,
  GET_USERS,
  GET_USER,
  REMOVE_USER,
  SET_LOADING,
} from "./Types";
import axios from "axios";
import { db, firebase } from "../firebase";

const initialState = {
  users: [],
  loggedInUser: {},
  data: [],
  loading: true,
  updated: "",
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
      `https://golf-leaderboard-data.p.rapidapi.com/leaderboard/220`,
      requestOptions
    );
    dispatch({
      type: GET_SCORE_DATA,
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
    const user = await state.users.filter((u) => u.email === email);
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
    const user = state.users.filter((u) => u.email === email);
    console.log(user);
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
    golferThreeID
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
              }),
            });
        });
      });

    setLoading();
    const snapshot = await db.collection("users").get();

    const res = snapshot.docs.map((doc) => doc.data());
    console.log("got users from selection");
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
        loggedInUser: state.loggedInUser,
        data: state.data,
        loading: state.loading,
        selections: state.selections,
        getScoreData,
        setLoading,
        getUsers,
        addUser,
        removeUser,
        getUser,
        addSelections,
        matchSelection,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
