import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import { GET_SCORE_DATA, GET_USERS } from "./Types";
import axios from "axios";
import { db, firebase } from "../firebase";

const initialState = {
  users: [],
  data: [],
  loading: true,
  selections: [{ selectionOne: "", selectionTwo: "", selectionThree: "" }],
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

  const addUser = async (name, email) => {
    console.log(name);
    console.log(email);
    setLoading();
    db.collection("users").add({
      name: name,
      email: email,
      // selections: [
      //   {
      //     golferOne: "",
      //     golferTwo: "",
      //     golferThree: "",
      //   },
      // ],
    });
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
    db.collection("users")
      .where("email", "==", email)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const docId = doc.id;

          db.collection("users")
            .doc(docId)
            .update({
              selections: firebase.firestore.FieldValue.arrayUnion({
                selections: {
                  golferOne: { name: golferOne, id: parseInt(golferOneID) },
                  golferTwo: { name: golferTwo, id: parseInt(golferTwoID) },
                  golferThree: {
                    name: golferThree,
                    id: parseInt(golferThreeID),
                  },
                },
              }),
            });
        });
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
        selections: state.selections,
        getScoreData,
        setLoading,
        getUsers,
        addUser,
        addSelections,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
