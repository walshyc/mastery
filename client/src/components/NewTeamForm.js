import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const TeamForm = (props) => {
  const {
    selections,
    setSelections,
    data,
    handleChange,
    teamCount,
    number,
    setTeamCount,
  } = props;



  const eu = [
    'ENG',
    'ESP',
    'NOR',
    'SCO',
    'GER',
    'IRL',
    'NIR',
    'ITA',
    'FRA',
    'SWE',
    'AUT',
    'WAL',
  ];
  let rowPlayers = [];
  let usaPlayers = [];
  let euPlayers = data.filter((player) => {
    if (eu.includes(player.country)) {
      return eu.includes(player.country);
    } else if (player.country === 'USA') {
      usaPlayers.push(player);
    } else {
      rowPlayers.push(player);
    }
  });

  rowPlayers.sort((a, b) => {
    return a.first_name > b.first_name ? 1 : -1;
  });
  usaPlayers.sort((a, b) => {
    return a.first_name > b.first_name ? 1 : -1;
  });
  euPlayers.sort((a, b) => {
    return a.first_name > b.first_name ? 1 : -1;
  });

  const handleDeleteClick = (e) => {
    e.preventDefault();
    setTeamCount((teamCount) => teamCount - 1);
    setSelections({
      selections: [
        { selection: '', id: '', no: 'selectionOne' },
        { selection: '', id: '', no: 'selectionTwo' },
        { selection: '', id: '', no: 'selectionThree' },
        { selection: '', id: '', no: 'selectionFour' },
        { selection: '', id: '', no: 'selectionFive' },
        { selection: '', id: '', no: 'selectionSix' },
      ],
    });
  };
  let oneIndex = selections.selections.findIndex((s) => {
    return s.no === 'selectionOne';
  });
  let twoIndex = selections.selections.findIndex((s) => {
    return s.no === 'selectionTwo';
  });
  let threeIndex = selections.selections.findIndex((s) => {
    return s.no === 'selectionThree';
  });
  let fourIndex = selections.selections.findIndex((s) => {
    return s.no === 'selectionFour';
  });
  let fiveIndex = selections.selections.findIndex((s) => {
    return s.no === 'selectionFive';
  });
  let sixIndex = selections.selections.findIndex((s) => {
    return s.no === 'selectionSix';
  });

  return (
    <>
      <div>
        <div className="w-11/12 mx-auto">
          <div
            className={
              number < 4 ? 'container mx-auto' : 'container mx-auto border-t'
            }
          >
            <div className="my-8 mx-auto xl:w-full xl:mx-0 ">
              <div className="xl:flex lg:flex md:flex flex-wrap justify-between gap-1">
                <div className="flex flex-row mb-6 w-full justify-between">
                  <h3 className="text-gray-200 text-left text-lg font-bold leading-tight tracking-normal mb-2">
                    Entry {number}
                  </h3>
                  {teamCount >= 2 ? (
                    <div className="flex justify-end">
                      <button
                        onClick={handleDeleteClick}
                        className="bg-red-500 mr-6 px-2 py-2 mb-4 text-gray-100 font-bold rounded"
                      >
                        Remove Team
                      </button>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className="flex flex-col w-full mt-2">
                  <label
                    htmlFor="entryName"
                    className="text-gray-200 text-left text-sm font-bold leading-tight tracking-normal mb-2"
                  >
                    Entry Name
                  </label>
                  <input
                    id="entryName"
                    onChange={handleChange}
                    value={selections.entryName}
                    className="text-gray-900 focus:outline-none focus:border focus:border-green-700 bg-white font-normal   h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
                    placeholder="Name to be displayed"
                  />
                </div>
                <div className="flex flex-col w-full md:w-2/5 my-1">
                  <label
                    htmlFor="City"
                    className="text-gray-200 text-left text-sm font-bold leading-tight tracking-normal my-2"
                  >
                    USA 1
                  </label>
                  <div className="border border-gray-300 dark:border-gray-700 shadow-sm rounded flex relative">
                    <select
                      value={selections.selections[oneIndex].selection}
                      onChange={handleChange}
                      type="text"
                      name="selectionOne"
                      required
                      id="selectionOne"
                      className="bg-white appearance-none z-10 pl-3 h-8 w-full text-sm border border-transparent focus:outline-none focus:border-gray-900  text-gray-800 rounded"
                    >
                      <option value=""></option>
                      {data &&
                        usaPlayers
                          .filter((player) => {
                            let n = `${player.first_name} ${player.last_name}`;
                            return (
                              n !== selections.selections[twoIndex].selection
                            );
                          })
                          .sort((a, b) => {
                            return a < b ? 1 : -1;
                          })
                          .map((p) => {
                            const name = `${p.first_name} ${p.last_name}`;
                            return (
                              <option
                                value={name}
                                name={name}
                                key={p.player_id}
                                playerid={p.player_id}
                                selection="selectionOne"
                                selectionid="selectionOneId"
                              >
                                {name}
                              </option>
                            );
                          })}
                    </select>
                    <div
                      className="px-4 flex items-center border-l border-gray-300 dark:border-gray-700 flex-col justify-center text-gray-500
                                      dark:text-gray-400 absolute right-0 bottom-0 top-0 mx-auto z-20 pointer-events-none "
                    >
                      <svg
                        tabIndex={0}
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-up"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 15 12 9 18 15" />
                      </svg>
                      <svg
                        tabIndex={0}
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-down"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full md:w-2/5 my-1">
                  <label
                    htmlFor="City"
                    className="text-gray-200 text-left text-sm font-bold leading-tight tracking-normal my-2"
                  >
                    USA 2
                  </label>
                  <div className="border border-gray-300 dark:border-gray-700 shadow-sm rounded flex relative">
                    <select
                      value={selections.selections[twoIndex].selection}
                      onChange={handleChange}
                      type="text"
                      name="selectionTwo"
                      required
                      id="SelectionTwo"
                      className="bg-white appearance-none z-10 pl-3 h-8 w-full text-sm border border-transparent focus:outline-none focus:border-gray-900  text-gray-800 rounded"
                    >
                      {' '}
                      <option value=""></option>
                      {data &&
                        usaPlayers
                          .filter((player) => {
                            let n = `${player.first_name} ${player.last_name}`;
                            return (
                              n !== selections.selections[oneIndex].selection
                            );
                          })
                          .map((p) => {
                            const name = `${p.first_name} ${p.last_name}`;
                            return (
                              <option
                                value={name}
                                name={name}
                                key={p.player_id}
                                playerid={p.player_id}
                                selection="selectionTwo"
                                selectionid="selectionTwoId"
                              >
                                {name}
                              </option>
                            );
                          })}
                    </select>
                    <div
                      className="px-4 flex items-center border-l border-gray-300 dark:border-gray-700 flex-col justify-center text-gray-500
                                      dark:text-gray-400 absolute right-0 bottom-0 top-0 mx-auto z-20 pointer-events-none "
                    >
                      <svg
                        tabIndex={0}
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-up"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 15 12 9 18 15" />
                      </svg>
                      <svg
                        tabIndex={0}
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-down"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full md:w-2/5 my-1">
                  <label
                    htmlFor="City"
                    className="text-gray-200 text-left text-sm font-bold leading-tight tracking-normal my-2"
                  >
                    European 1
                  </label>
                  <div className="border border-gray-300 dark:border-gray-700 shadow-sm rounded flex relative">
                    <select
                      value={selections.selections[threeIndex].selection}
                      onChange={handleChange}
                      type="text"
                      name="selectionThree"
                      required
                      id="SelectionThree"
                      className="bg-white appearance-none z-10 pl-3 h-8 w-full text-sm border border-transparent focus:outline-none focus:border-gray-900  text-gray-800 rounded"
                    >
                      {' '}
                      <option value=""></option>
                      {data &&
                        euPlayers
                          .filter((player) => {
                            let n = `${player.first_name} ${player.last_name}`;
                            return (
                              n !== selections.selections[fourIndex].selection
                            );
                          })
                          .map((p) => {
                            const name = `${p.first_name} ${p.last_name}`;
                            return (
                              <option
                                value={name}
                                name={name}
                                key={p.player_id}
                                playerid={p.player_id}
                                selection="selectionThree"
                                selectionid="selectionThree"
                              >
                                {name}
                              </option>
                            );
                          })}
                    </select>
                    <div
                      className="px-4 flex items-center border-l border-gray-300 dark:border-gray-700 flex-col justify-center text-gray-500
                                      dark:text-gray-400 absolute right-0 bottom-0 top-0 mx-auto z-20 pointer-events-none "
                    >
                      <svg
                        tabIndex={0}
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-up"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 15 12 9 18 15" />
                      </svg>
                      <svg
                        tabIndex={0}
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-down"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full md:w-2/5 my-1">
                  <label
                    htmlFor="City"
                    className="text-gray-200 text-left text-sm font-bold leading-tight tracking-normal my-2"
                  >
                    European 2
                  </label>
                  <div className="border border-gray-300 dark:border-gray-700 shadow-sm rounded flex relative">
                    <select
                      value={selections.selections[fourIndex].selection}
                      onChange={handleChange}
                      type="text"
                      name="selectionFour"
                      required
                      id="SelectionFour"
                      className="bg-white appearance-none z-10 pl-3 h-8 w-full text-sm border border-transparent focus:outline-none focus:border-gray-900  text-gray-800 rounded"
                    >
                      {' '}
                      <option value=""></option>
                      {data &&
                        euPlayers
                          .filter((player) => {
                            let n = `${player.first_name} ${player.last_name}`;
                            return (
                              n !== selections.selections[threeIndex].selection
                            );
                          })
                          .map((p) => {
                            const name = `${p.first_name} ${p.last_name}`;
                            return (
                              <option
                                value={name}
                                name={name}
                                key={p.player_id}
                                playerid={p.player_id}
                                selection="selectionFour"
                                selectionid="selectionFour"
                              >
                                {name}
                              </option>
                            );
                          })}
                    </select>
                    <div
                      className="px-4 flex items-center border-l border-gray-300 dark:border-gray-700 flex-col justify-center text-gray-500
                                      dark:text-gray-400 absolute right-0 bottom-0 top-0 mx-auto z-20 pointer-events-none "
                    >
                      <svg
                        tabIndex={0}
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-up"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 15 12 9 18 15" />
                      </svg>
                      <svg
                        tabIndex={0}
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-down"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full md:w-2/5 my-1">
                  <label
                    htmlFor="City"
                    className="text-gray-200 text-left text-sm font-bold leading-tight tracking-normal my-2"
                  >
                    Rest of the World 1
                  </label>
                  <div className="border border-gray-300 dark:border-gray-700 shadow-sm rounded flex relative">
                    <select
                      value={selections.selections[fiveIndex].selection}
                      onChange={handleChange}
                      type="text"
                      name="selectionFive"
                      required
                      id="SelectionFive"
                      className="bg-white appearance-none z-10 pl-3 h-8 w-full text-sm border border-transparent focus:outline-none focus:border-gray-900  text-gray-800 rounded"
                    >
                      {' '}
                      <option value=""></option>
                      {data &&
                        rowPlayers
                          .filter((player) => {
                            let n = `${player.first_name} ${player.last_name}`;
                            return (
                              n !== selections.selections[sixIndex].selection
                            );
                          })
                          .map((p) => {
                            const name = `${p.first_name} ${p.last_name}`;
                            return (
                              <option
                                value={name}
                                name={name}
                                key={p.player_id}
                                playerid={p.player_id}
                                selection="selectionFive"
                                selectionid="selectionFive"
                              >
                                {name}
                              </option>
                            );
                          })}
                    </select>
                    <div
                      className="px-4 flex items-center border-l border-gray-300 dark:border-gray-700 flex-col justify-center text-gray-500
                                      dark:text-gray-400 absolute right-0 bottom-0 top-0 mx-auto z-20 pointer-events-none "
                    >
                      <svg
                        tabIndex={0}
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-up"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 15 12 9 18 15" />
                      </svg>
                      <svg
                        tabIndex={0}
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-down"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full md:w-2/5 my-1">
                  <label
                    htmlFor="City"
                    className="text-gray-200 text-left text-sm font-bold leading-tight tracking-normal my-2"
                  >
                    Rest of the World 2
                  </label>
                  <div className="border border-gray-300 dark:border-gray-700 shadow-sm rounded flex relative">
                    <select
                      value={selections.selections[sixIndex].selection}
                      onChange={handleChange}
                      type="text"
                      name="selectionSix"
                      required
                      id="SelectionSix"
                      className="bg-white appearance-none z-10 pl-3 h-8 w-full text-sm border border-transparent focus:outline-none focus:border-gray-900  text-gray-800 rounded"
                    >
                      {' '}
                      <option value=""></option>
                      {data &&
                        rowPlayers
                          .filter((player) => {
                            let n = `${player.first_name} ${player.last_name}`;
                            return (
                              n !== selections.selections[fiveIndex].selection
                            );
                          })
                          .map((p) => {
                            const name = `${p.first_name} ${p.last_name}`;
                            return (
                              <option
                                value={name}
                                name={name}
                                key={p.player_id}
                                playerid={p.player_id}
                                selection="selectionSix"
                                selectionid="selectionSix"
                              >
                                {name}
                              </option>
                            );
                          })}
                    </select>
                    <div
                      className="px-4 flex items-center border-l border-gray-300 dark:border-gray-700 flex-col justify-center text-gray-500
                                      dark:text-gray-400 absolute right-0 bottom-0 top-0 mx-auto z-20 pointer-events-none "
                    >
                      <svg
                        tabIndex={0}
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-up"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 15 12 9 18 15" />
                      </svg>
                      <svg
                        tabIndex={0}
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-down"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamForm;
