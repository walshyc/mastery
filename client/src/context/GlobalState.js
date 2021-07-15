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
  GET_CBAR,
  SET_MESSAGE,
} from './Types';
import axios from 'axios';
import { db, firebase } from '../firebase';
import * as moment from 'moment';
//import data from '../static/data/mastersData.json';

const initialState = {
  masters: [],
  message: null,
  users: [],
  cbarPlayers: [],
  loggedInUser: {},
  data: [],
  worldRankings: [],
  entries: [],
  loading: true,
  one: null,
  two: null,
  three: null,
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
      `https://golf-leaderboard-data.p.rapidapi.com/leaderboard/294`,
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
      `https://golf-leaderboard-data.p.rapidapi.com/entry-list/294`,
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
      payload: res.data.results.rankings,
    });
  };
  const getCastlebar = async () => {
    setLoading();
    const requestOptions = {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'golf-leaderboard-data.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    setLoading();
    const resRankings = await axios.get(
      `https://golf-leaderboard-data.p.rapidapi.com/world-rankings`,
      requestOptions
    );
    setLoading();
    const res = await axios.get(
      `https://gsx2json.com/api?id=14TmND5J_9SSarbrghzRPGMjQLtvsczO5Rnkwp0xBnSA&sheet=1`
    );
    const data = res.data.rows.map((a) => {
      const player = resRankings.data.results.rankings.find(
        (b) => b.player_name === a.fullname
      );

      return { player, number: a.number };
    });
    console.log(data);
    let groupOne = data
      .filter((r) => r.number > 0 && r.number < 26)
      .sort((a, b) => b.number - a.number);
    let groupTwo = data
      .filter((r) => r.number > 25 && r.number < 51)
      .sort((a, b) => b.number - a.number);
    let groupThree = data
      .filter((r) => r.number > 50 && r.number < 76)
      .sort((a, b) => b.number - a.number);
    setLoading();
    dispatch({
      type: GET_CBAR,
      payload: { groupOne, groupTwo, groupThree },
    });
  };

  const getUsers = async () => {
    setLoading();
    const snapshot = await db.collection('usersOpenNew').get();
    const res = snapshot.docs.map((doc) => doc.data());

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

    console.log(totaled);
    console.log(duplicate);
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

  const setMessage = (message) => {
    setLoading();
    dispatch({
      type: SET_MESSAGE,
      payload: message,
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
    golferOneName,
    golferTwoID,
    golferTwoName,
    golferThreeID,
    golferThreeName,
    golferFourID,
    golferFourName,
    golferFiveID,
    golferFiveName,
    golferSixID,
    golferSixName,
    entryName,
    tiebraker
  ) => {
    setLoading();
    await db.collection('usersOpenNew').add({
      entryName,
      name,
      email,
      tiebraker,
      selections: firebase.firestore.FieldValue.arrayUnion({
        golferOne: matchSelection(golferOneID),
        golferTwo: matchSelection(golferTwoID),
        golferThree: matchSelection(golferThreeID),
        golferFour: matchSelection(golferFourID),
        golferFive: matchSelection(golferFiveID),
        golferSix: matchSelection(golferSixID),
      }),
    });

    const snapshot = await db.collection('usersOpen').get();

    const res = snapshot.docs.map((doc) => doc.data());
    dispatch({
      type: GET_USERS,
      payload: res,
    });
  };
  const convertSelections = async () => {
    setLoading();
    const snapshotUsers = await db.collection('usersOpen').get();
    const resUsers = snapshotUsers.docs.map((doc) => doc.data());
    console.log(resUsers);
    const snapshotUsersTwo = await db.collection('usersOpenNew').get();
    const resUsersTwo = snapshotUsersTwo.docs.map((doc) => doc.data());
    console.log('old', resUsers);
    console.log('new', resUsersTwo);

    resUsers.map(async (player) => {
      // console.log(player.selections[0].golferOne.name);
      // console.log(player.selections[0].golferTwo.name);
      // console.log(player.selections[0].golferThree.name);
      // console.log(player.selections[0].golferFour.name);
      // console.log(player.selections[0].golferFive.name);
      // console.log(player.selections[0].golferSix.name);
      // if (
      //   player.selections[0].golferOne.id === '99895' ||
      //   player.selections[0].golferTwo.id === '99895' ||
      //   player.selections[0].golferThree.id === '99895' ||
      //   player.selections[0].golferFour.id === '99895' ||
      //   player.selections[0].golferFive.id === '99895' ||
      //   player.selections[0].golferSix.id === '99895'
      // ) {
      //   console.log(player);
      // }
      try {
        await db.collection('usersOpenNew').add({
          entryName: player.entryName,
          name: player.name,
          email: player.email,
          tiebraker: player.tiebraker,
          selections: firebase.firestore.FieldValue.arrayUnion({
            golferOne: matchSelection(player.selections[0].golferOne.id)[0],
            golferTwo: matchSelection(player.selections[0].golferTwo.id)[0],
            golferThree: matchSelection(player.selections[0].golferThree.id)[0],
            golferFour: matchSelection(player.selections[0].golferFour.id)[0],
            golferFive: matchSelection(player.selections[0].golferFive.id)[0],
            golferSix: matchSelection(player.selections[0].golferSix.id)[0],
          }),
        });
      } catch (error) {
        console.log(error);
        console.log(player);
      }
    });

    // const snapshot = await db.collection('usersOpen').get();

    // const res = snapshot.docs.map((doc) => doc.data());
    // dispatch({
    //   type: GET_USERS,
    //   payload: res,
    // });
  };
  const addSelectionsOpen = async (
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
        message: state.message,
        users: state.users,
        entries: state.entries,
        loggedInUser: state.loggedInUser,
        data: state.data,
        worldRankings: state.worldRankings,
        loading: state.loading,
        selections: state.selections,
        start: state.start,
        cbarPlayers: state.cbarPlayers,
        one: state.one,
        two: state.two,
        three: state.three,
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
        convertSelections,
        matchSelection,
        getCastlebar,
        setMessage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
