import React, { useContext, useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Hidden, useTheme } from '@material-ui/core';
import PersonSharpIcon from '@material-ui/icons/PersonSharp';
import { GlobalContext } from '../../context/GlobalState';
import Row from './Row';
import Alert from '@material-ui/lab/Alert';
import Spinner from '../layout/Spinner';
import { makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import * as moment from 'moment';
import AutorenewIcon from '@material-ui/icons/Autorenew';

const ScoreTable = () => {
  useEffect(() => {
    getScoreData();
    getUsers();
    getWorldRankings();
    getEntries();
    // if (currentUser) {
    //   getUser(currentUser.email);
    // }
    // eslint-disable-next-line
  }, []);
  const [refresh, setRefresh] = useState(false);
  const [show, setShow] = useState(null);

  const useRowStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
    tableHead: {
      background: theme.palette.primary.main,
      color: '#ecfef6',
    },
    tableCell: {
      color: '#ecfef6',
    },
    table: {
      marginTop: '20px',
    },
  }));
  const classes = useRowStyles();
  const {
    data,
    loading,
    getUsers,
    getWorldRankings,
    getEntries,
    users,
    matchSelection,
    start,
    getScoreData,
  } = useContext(GlobalContext);

  const createData = (
    entryName,
    name,
    golfer1,
    oneID,
    golfer2,
    twoID,
    golfer3,
    threeID,
    golfer4,
    fourID,
    golfer5,
    fiveID,
    golfer6,
    sixID,
    totalScore
  ) => {
    return {
      entryName,
      name,
      golfer1,
      golfer2,
      golfer3,
      golfer4,
      golfer5,
      golfer6,
      totalScore,
      detail: [
        matchSelection(oneID)[0],
        matchSelection(twoID)[0],
        matchSelection(threeID)[0],
        matchSelection(fourID)[0],
        matchSelection(fiveID)[0],
        matchSelection(sixID)[0],
      ],
    };
  };
  const score = (id) =>
    data.results.leaderboard.find((g) => g.player_id === id).total_to_par;

  let rows = [];
  if (data.length === 0) {
    rows = [];
  } else {
    rows = users
      .filter((a) => {
        if (typeof a.selections !== 'undefined' && a.selections != null) {
          return true; // skip
        }
        return false;
      })
      .map((u) => {
        const name = u.name;
        const entryName = u.entryName;
        let inside = u.selections.map((s) => {
          const row = createData(
            entryName,
            name,
            `${s.golferOne.first_name} ${s.golferOne.last_name}`,
            s.golferOne.player_id,
            `${s.golferTwo.first_name} ${s.golferTwo.last_name}`,
            s.golferTwo.player_id,
            `${s.golferThree.first_name} ${s.golferThree.last_name}`,
            s.golferThree.player_id,
            `${s.golferFour.first_name} ${s.golferFour.last_name}`,
            s.golferFour.player_id,
            `${s.golferFive.first_name} ${s.golferFive.last_name}`,
            s.golferFive.player_id,
            `${s.golferSix.first_name} ${s.golferSix.last_name}`,
            s.golferSix.player_id,
            score(s.golferOne.player_id) +
              score(s.golferTwo.player_id) +
              score(s.golferThree.player_id) +
              score(s.golferFour.player_id) +
              score(s.golferFive.player_id) +
              score(s.golferSix.player_id)
          );
          return row;
        });
        return inside;
      });
  }
  let allScores = rows.reduce((a, b) => a.concat(b), []);
  const date = moment('2020-11-12T12:00:00.000');
  if (Date.now() < date) {
    for (let i = allScores.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = allScores[i];
      allScores[i] = allScores[j];
      allScores[j] = temp;
    }
  }

  const refreshPage = (e) => {
    getScoreData();
    setRefresh(!refresh);
  };

  if (loading) {
    return <Spinner></Spinner>;
  } else {
    return (
      <>
        {/* <Alert icon={<InfoIcon fontSize="inherit" />}>
          There is an issue with some golfers scores not showing correctly. <br></br>
          Hopefully it will be resolved soon!{" "}
        </Alert> */}
        <div className="mx-auto container px-6 mt-24">
          {allScores
            .sort((a, b) => {
              if (a.totalScore < b.totalScore) {
                return -1;
              } else return 1;
            })
            .map((d, i) => (
              <div className="bg-gray-900 my-3 border border-gray-900 rounded-xl shadow-xl">
                <div className="flex py-2 items-center justify-start overflow-x-auto">
                  <div className="cursor-pointer w-1/12 lg:hidden ml-2">
                    {show === i ? (
                      <svg
                        onClick={() => setShow(null)}
                        width={28}
                        height={28}
                        className="icon icon-tabler text-gray-100"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        width={28}
                        height={28}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler text-gray-100 icon-tabler-chevron-down"
                        onClick={() => setShow(i)}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    )}
                  </div>
                  <h4 className="text-lg text-gray-100 font-semibold w-8/12 lg:w-3/12 lg:ml-4 left text-left">
                    {d.entryName}
                  </h4>
                  {d.detail
                    .sort((a, b) => {
                      if (a.position > b.position) {
                        return 1;
                      } else {
                        return -1;
                      }
                    })
                    .map((g) => {
                      return (
                        <h4 className="hidden lg:block text-xs text-gray-100 font-light lg:w-2/12 text-left">
                          <b> {g.last_name.toUpperCase()}</b>
                          {`, ${g.first_name.charAt(0)}`}{' '}
                          <b>
                            {g.total_to_par > 0
                              ? `+${g.total_to_par}`
                              : g.total_to_par}
                          </b>
                        </h4>
                      );
                    })}
                  {/* 
                  <h4 className="hidden lg:block text-xs text-gray-100 font-light lg:w-2/12 text-left">
                    {d.golfer2}
                  </h4>
                  <h4 className="hidden lg:block text-xs text-gray-100 font-light lg:w-2/12 text-left">
                    {d.golfer3}
                  </h4>
                  <h4 className="hidden lg:block text-xs text-gray-100 font-light lg:w-2/12 text-left">
                    {d.golfer4}
                  </h4>
                  <h4 className="hidden lg:block text-xs text-gray-100 font-light lg:w-2/12 text-left">
                    {d.golfer3}
                  </h4>
                  <h4 className="hidden lg:block text-xs text-gray-100 font-light lg:w-2/12 text-left">
                    {d.golfer4}
                  </h4> */}
                  <h4 className="text-lg text-gray-100 font-semibold ml-auto  w-2/12 lg:w-1/12 ">
                    {d.totalScore > 0 ? `+${d.totalScore}` : d.totalScore}
                  </h4>
                </div>
                {show == i && (
                  <div className="w-full shadow text-left text-gray-100">
                    <div className="border-b border-green-600 flex">
                      <div className="py-5 ml-2 w-2/12 font-bold text-lg">
                        Pos
                      </div>
                      <div className="py-5 w-4/12 font-bold text-lg">Name</div>
                      <div className="py-5 w-2/12 font-bold text-lg">
                        Played
                      </div>
                      <div className="py-5 w-2/12 font-bold text-lg">Today</div>
                      <div className="py-5 w-2/12 font-bold text-lg">Score</div>
                    </div>

                    <div>
                      {d.detail
                        .sort((a, b) => {
                          if (a.position > b.position) {
                            return 1;
                          } else {
                            return -1;
                          }
                        })
                        .map((g) => {
                          return (
                            <div className="border-b border-gray-800 flex bg-gray-700 ">
                              <div className="py-5 ml-2 pr-2 text-sm w-2/12">
                                {g.position}
                              </div>
                              <div className="pr-2 py-5 text-sm  w-4/12">
                                <b>{g.last_name.toUpperCase()}</b>
                                {`, ${g.first_name.charAt(0)}`}
                              </div>
                              <div className="pr-2 py-5 text-sm  text-left w-2/12">
                                {g.holes_played}
                              </div>

                              <div className="py-5 pr-2 sm:pr-10  font-bold text-sm w-2/12">
                                {g.rounds[g.rounds.length - 1].total_to_par}
                              </div>
                              <div className="py-5 pr-2 font-bold text-sm  w-2/12">
                                {g.total_to_par > 0
                                  ? `+${g.total_to_par}`
                                  : g.total_to_par}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          {/* {data.map((d,i) => {
              return(
                
              )
          })} */}

          <hr className="mt-6 border-t border-gray-300 dark:border-gray-700" />

          <style>
            {`
                    .checkbox:checked + .check-icon {
                        display: flex;
                    }
                    `}
          </style>
        </div>
        {/* <TableContainer component={Paper}>
          <Table size="small" aria-label="collapsible table">
            <TableHead>
              <TableRow className={classes.tableHead}>
                <TableCell
                  onClick={refreshPage}
                  style={{ color: theme.palette.primary.light }}
                >
                  <AutorenewIcon style={{ marginTop: 5 }}></AutorenewIcon>{" "}
                </TableCell>
                <TableCell style={{ color: theme.palette.primary.light }}>
                  Name
                </TableCell>{" "}
                {Date.now() > start ? (
                  <TableCell
                    style={{ color: theme.palette.primary.light }}
                    align="left"
                  >
                    Score
                  </TableCell>
                ) : (
                  ""
                )}
                <Hidden xsDown>
                  <TableCell style={{ color: theme.palette.primary.light }}>
                    <PersonSharpIcon style={{ marginTop: 5 }}></PersonSharpIcon>
                  </TableCell>
                  <TableCell style={{ color: theme.palette.primary.light }}>
                    <PersonSharpIcon style={{ marginTop: 5 }}></PersonSharpIcon>
                  </TableCell>
                  <TableCell style={{ color: theme.palette.primary.light }}>
                    <PersonSharpIcon style={{ marginTop: 5 }}></PersonSharpIcon>
                  </TableCell>
                  <TableCell style={{ color: theme.palette.primary.light }}>
                    <PersonSharpIcon></PersonSharpIcon>
                  </TableCell>
                </Hidden>
              </TableRow>
            </TableHead>
            <TableBody>
              {allScores
                .sort((a, b) => {
                  if (a.totalScore < b.totalScore) {
                    return -1;
                  } else return 1;
                })
                .map((row, index) => (
                  <Row key={`${row.name}-${index}`} row={row} index={index} />
                ))}
            </TableBody>
          </Table>
        </TableContainer> */}
      </>
    );
  }
};

export default ScoreTable;
