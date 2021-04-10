import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import * as moment from 'moment';
import masters from '../../static/images/masters.jpg';

const ScoreTable = () => {
  // useEffect(() => {
  //   getScoreData();
  //   getUsers();
  //   getWorldRankings();
  //   getEntries();

  //   // if (currentUser) {
  //   //   getUser(currentUser.email);
  //   // }
  //   // eslint-disable-next-line
  // }, []);
  //const [refresh, setRefresh] = useState(false);
  const [show, setShow] = useState(null);

  const { data, loading, users, matchSelection } = useContext(GlobalContext);
  console.log(data);
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
    totalScore,
    tiebraker,
    status
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
      tiebraker,
      detail: [
        matchSelection(oneID)[0],
        matchSelection(twoID)[0],
        matchSelection(threeID)[0],
        matchSelection(fourID)[0],
        matchSelection(fiveID)[0],
        matchSelection(sixID)[0],
      ],
      status,
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
              score(s.golferSix.player_id),
            u.tiebraker,
            s.status
          );
          return row;
        });
        return inside;
      });
  }
  let allScores = rows.reduce((a, b) => a.concat(b), []);
  console.log(allScores);
  const date = moment('2020-11-12T12:00:00.000');
  if (Date.now() < date) {
    for (let i = allScores.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = allScores[i];
      allScores[i] = allScores[j];
      allScores[j] = temp;
    }
  }

  const checkRound = (a) => {
    switch (a) {
      case 1:
        return '1st Round';
      case 2:
        return '2nd Round';
      case 3:
        return '3rd Round';
      case 4:
        return '4th Round';
      default:
        return '';
    }
  };

  // const refreshPage = (e) => {
  //   getScoreData();
  //   setRefresh(!refresh);
  // };

  if (loading) {
    return <Spinner></Spinner>;
  } else {
    return (
      <>
        {/* <Alert icon={<InfoIcon fontSize="inherit" />}>
          There is an issue with some golfers scores not showing correctly. <br></br>
          Hopefully it will be resolved soon!{" "}
        </Alert> */}
        <div
          className={
            show != null
              ? 'w-full h-full  mx-auto container px-6 mt-2 mb-10'
              : 'w-full h-full  mx-auto container px-6 mt-2'
          }
        >
          <div className="w-full bg-gray-900 my-3 border border-gray-900 rounded-xl shadow-xl">
            <div className="w-full p-4 f rounded shadow ">
              <div className="flex flex-row lg:flex-row xl:items-center justify-around">
                <img
                  className="hidden lg:w-3/12  w-1/2 h-1/2 rounded-full sm:flex items-center justify-center bg-gray-100"
                  src={masters}
                  alt="masters"
                />

                <div className="flex items-center justify-start w-full lg:w-9/12 sm:w-1/2 sm:pl-10 text-left">
                  <div className="flex flex-col justify-between items-start ">
                    <div className="flex justify-start gap-4 pb-1">
                      <svg
                        className="w-6 h-6 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <p className="text-base sm:text-xl lg:text-2xl sm:pb-3 text-left font-semibold leading-5 pr-1 text-gray-300">
                        {data.results && data.results.tournament.name}
                      </p>
                    </div>
                    <div className="flex justify-start gap-4 pb-1">
                      <svg
                        className="w-6 h-6 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                        />
                      </svg>
                      <p className="text-base sm:text-xl lg:text-2xl sm:pb-3 text-left font-semibold leading-5 pr-1 text-gray-300">
                        {data.results && data.results.tournament.course}
                      </p>
                    </div>
                    <div className="flex justify-start gap-4 pb-1">
                      <svg
                        className="w-6 h-6 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                      </svg>
                      <p className="text-base sm:text-xl lg:text-2xl sm:pb-3 text-left font-semibold leading-5 pr-1 text-gray-300">
                        {data.results &&
                          checkRound(
                            data.results.tournament.live_details.current_round
                          )}
                      </p>
                    </div>
                    <div className="flex justify-start gap-4 pb-1">
                      <svg
                        className="w-6 h-6 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      <p className="text-base sm:text-xl lg:text-2xl sm:pb-3 text-left font-semibold leading-5 pr-1 text-gray-300">
                        {data.results &&
                          'Updated ' +
                            moment(
                              new Date(
                                data.results.tournament.live_details.updated
                              ).toISOString()
                            ).fromNow('')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center md:hidden">
            <div
              id="alert"
              className="w-full bg-yellow-200 shadow rounded-md  md:flex justify-between items-center  top-0 mt-2 mb-2 py-2 px-2 translate-hidden"
            >
              <div className="sm:flex items-center">
                <div className="flex items-end"></div>
                <div className="h-1 w-1 bg-yellow-500 rounded-full mr-2 hidden xl:block" />
                <p className="text-base font-semibold text-gray-900">
                  Please click on your team to answer a quick question in the
                  event of a tiebraker being required!
                </p>
              </div>
            </div>
          </div>
          {allScores
            .sort((a, b) => {
              if (a.totalScore < b.totalScore) {
                return -1;
              } else return 1;
            })
            .map((d, i) => (
              <div
                key={d.entryName + i + ''}
                className="bg-gray-900 my-2 border border-gray-900 rounded-xl shadow-xl select-none"
              >
                <div className="flex py-1 items-center justify-start overflow-x-auto">
                  <div className="cursor-pointer w-1/12 lg:hidden ml-2">
                    {show === i ? (
                      <svg
                        onClick={() => setShow(null)}
                        width={28}
                        height={28}
                        className="icon icon-tabler text-gray-300"
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
                        className="icon icon-tabler text-gray-300 icon-tabler-chevron-down"
                        onClick={() => setShow(i)}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    )}
                  </div>
                  {show === i ? (
                    <h4
                      onClick={() => setShow(null)}
                      className="text-base text-gray-300 font-semibold w-8/12 lg:w-3/12 lg:ml-4 pl-2 text-left"
                    >
                      {d.entryName}
                    </h4>
                  ) : (
                    <h4
                      onClick={() => setShow(i)}
                      className="text-base text-gray-300 font-semibold w-8/12 lg:w-3/12 lg:ml-4 pl-2 text-left"
                    >
                      {d.entryName}
                    </h4>
                  )}

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
                        <h4
                          key={`${g.first_name}${g.last_name} `}
                          className="hidden lg:block text-xs text-gray-300 lg:w-2/12 text-left "
                        >
                          {g.last_name}
                          {`, ${g.first_name.charAt(0)}`}{' '}
                          <span className="pl-1">
                            {g.total_to_par > 0
                              ? `+${g.total_to_par}`
                              : g.total_to_par}
                          </span>
                        </h4>
                      );
                    })}

                  <h4 className="text-lg text-gray-300 font-semibold ml-auto  w-2/12 lg:w-1/12 ">
                    {d.totalScore > 0 ? `+${d.totalScore}` : d.totalScore}
                  </h4>
                </div>
                {show === i && (
                  <div className="w-full text-left text-green-600">
                    <div className="border-b border-green-600 flex">
                      <div className="py-1 ml-2 w-2/12 font-bold text-sm  md:font-bold">
                        Pos
                      </div>
                      <div className="py-1 w-4/12 font-bold  text-sm md:font-bold">
                        Name
                      </div>
                      <div className="py-1 pr-2 w-2/12 font-bold text-right text-sm md:font-bold">
                        Played
                      </div>
                      <div className="py-1 pr-2 w-2/12 font-bold text-right text-sm md:font-bold">
                        Today
                      </div>
                      <div className="py-1 pr-2 w-2/12 font-bold text-right text-sm md:font-bold">
                        Score
                      </div>
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
                        .map((g, index) => {
                          return (
                            <div
                              key={g.first_name + index + ''}
                              className={
                                index === 5
                                  ? 'border-b rounded-xl shadow-none border-gray-800 flex bg-gray-900 text-gray-200'
                                  : 'border-b  border-gray-800 flex bg-gray-900 text-gray-200'
                              }
                            >
                              <div className="py-1 ml-2 pr-2  text-sm w-2/12">
                                {g.position}
                              </div>
                              <div className="pr-2 py-1 text-sm w-4/12">
                                {g.last_name}
                                {`, ${g.first_name.charAt(0)}`}
                              </div>
                              <div className="pr-2 py-1 text-sm text-right w-2/12">
                                {g.holes_played}
                              </div>

                              <div className="py-1 pr-2 text-right text-sm w-2/12">
                                {g.status === 'cut'
                                  ? "Cut"
                                  : g.rounds[g.rounds.length - 1].total_to_par}
                              </div>
                              <div className="py-1 pr-2 text-sm text-right w-2/12">
                                {g.total_to_par > 0
                                  ? `+${g.total_to_par}`
                                  : g.total_to_par}
                              </div>
                            </div>
                          );
                        })}
                      {d.tiebraker === true ? (
                        ''
                      ) : (
                        <div className="flex justify-end">
                          <Link
                            to={{
                              pathname: '/tiebreaker',
                              state: {
                                entry: d.entryName,
                              },
                            }}
                          >
                            <button className="ml-auto px-2 py-1 text-xs text-gray-100 m-2 rounded-xl bg-green-600">
                              Enter Tiebreaker
                            </button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

          <style>
            {`
                    .checkbox:checked + .check-icon {
                        display: flex;
                    }
                    `}
          </style>
        </div>
      </>
    );
  }
};

export default ScoreTable;
