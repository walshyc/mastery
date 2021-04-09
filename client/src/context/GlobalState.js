import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import {
  GET_SCORE_DATA,
  GET_USERS,
  GET_USER,
  REMOVE_USER,
  GET_WORLD_RANKINGS,
  SET_LOADING,
  GET_ENTRIES,
} from './Types';
import axios from 'axios';
import { db, firebase } from '../firebase';
import * as moment from 'moment';
//import data from '../static/data/mastersData.json';

const initialState = {
  masters: [],
  users: [],
  loggedInUser: {},
  data: [],
  worldRankings: [],
  entries: [],
  loading: true,
  updated: '',
  start: moment('2020-11-12T12:00:00.000'),
  selections: [
    { selectionOneID: '', selectionTwoID: '', selectionThreeID: '' },
  ],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getScoreData = async () => {
    setLoading();
    const requestOptions = {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'golf-leaderboard-data.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
      },
    };

    const res = await axios.get(
      `https://golf-leaderboard-data.p.rapidapi.com/leaderboard/279`,
      requestOptions
    );

    //console.log(res);
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
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'golf-leaderboard-data.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
      },
    };

    const res = await axios.get(
      `https://golf-leaderboard-data.p.rapidapi.com/entry-list/279`,
      requestOptions
    );
    //console.log(res);
    dispatch({
      type: GET_ENTRIES,
      payload: res.data.results.entry_list,
    });
  };

  const getWorldRankings = async () => {
    setLoading();
    const requestOptions = {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'golf-leaderboard-data.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
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
    const snapshot = await db.collection('usersNew').get();
    const res = snapshot.docs.map((doc) => doc.data());
    //console.log('got users')
    const ties = await db.collection('usersTie').get();
    const resties = ties.docs.map((doc) => doc.data());
    //console.log('got users')
    //console.log(resties);
    const totaled = res.map((u) => {
      return {
        name: u.entryName,
        total:
          u.selections[0].golferOne.player_id +
          u.selections[0].golferTwo.player_id +
          u.selections[0].golferThree.player_id +
          u.selections[0].golferFour.player_id +
          u.selections[0].golferFive.player_id +
          u.selections[0].golferSix.player_id,
      };
    });
    totaled.sort((a, b) => {
      if (a.total < b.total) {
        return -1;
      }
      if (a.total > b.total) {
        return 1;
      }
      return 0;
    });
    let duplicate = [];
    totaled.sort((a, b) => {
      if (a.total === b.total) {
        duplicate.push(a);
        duplicate.push(b);
        return 1;
      } else return 0;
    });

    //console.log(totaled);
    //console.log(duplicate);
    dispatch({
      type: GET_USERS,
      payload: res,
    });
  };

  const getUser = async (email) => {
    setLoading();
    //console.log('got user')
    const user = await state.users.filter(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
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
    //console.log('add user')
    db.collection('users').add({
      name: name,
      email: email.toLowerCase(),
    });
    const user = state.users.filter(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
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
  const addTie = async (entry, email, answer) => {
    await db.collection('usersTie').add({
      entry,
      email,
      answer,
    });

    await db
      .collection('usersNew')
      .where('entryName', '==', entry)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, ' => ', doc.data());
          doc.ref.update({ tie: answer, tiebraker: true });
        });
      });
  };

  const addSelections = async (
    name,
    email,
    golferOneID,
    golferTwoID,
    golferThreeID,
    golferFourID,
    golferFiveID,
    golferSixID,
    entryName
  ) => {
    setLoading();
    await db.collection('usersNew').add({
      entryName,
      name,
      email,
      selections: firebase.firestore.FieldValue.arrayUnion({
        golferOne: matchSelection(golferOneID)[0],
        golferTwo: matchSelection(golferTwoID)[0],
        golferThree: matchSelection(golferThreeID)[0],
        golferFour: matchSelection(golferFourID)[0],
        golferFive: matchSelection(golferFiveID)[0],
        golferSix: matchSelection(golferSixID)[0],
      }),
    });

    const snapshot = await db.collection('usersNew').get();

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
        addTie,
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
