import React from 'react';

const TeamForm = (props) => {
  const {
    selections,
    setSelections,
    data,
    handleChange,
    teamCount,
    number,
    setTeamCount,
    worldRankings,
    cbar,
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

  const result = cbar.map((a) => {
    const player = worldRankings.find((b) => b.player_name === a.fullname);

    return { player, number: a.number };
  });

  let groupOne = result
    .filter((r) => r.number > 0 && r.number < 26)
    .sort((a, b) => b.number - a.number);
  let groupTwo = result
    .filter((r) => r.number > 25 && r.number < 51)
    .sort((a, b) => b.number - a.number);
  let groupThree = result
    .filter((r) => r.number > 50 && r.number < 76)
    .sort((a, b) => b.number - a.number);
  // let rowPlayers = [];
  // let usaPlayers = [];
  // let euPlayers = data.filter((player) => {
  //   if (eu.includes(player.country)) {
  //     return eu.includes(player.country);
  //   } else if (player.country === 'USA') {
  //     usaPlayers.push(player);
  //   } else {
  //     rowPlayers.push(player);
  //   }
  // });

  // rowPlayers.sort((a, b) => {
  //   return a.first_name > b.first_name ? 1 : -1;
  // });
  // usaPlayers.sort((a, b) => {
  //   return a.first_name > b.first_name ? 1 : -1;
  // });
  // euPlayers.sort((a, b) => {
  //   return a.first_name > b.first_name ? 1 : -1;
  // });

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
                <div className="flex flex-col w-full mt-4">
                  <label
                    htmlFor="totalscore"
                    className="text-gray-200 text-left text-sm font-bold leading-tight tracking-normal mb-2"
                  >
                    Tiebreaker - Number of birdies scored in the final round
                  </label>
                  <input
                    id="tiebreaker"
                    onChange={handleChange}
                    value={selections.tiebreaker}
                    className="text-gray-900 focus:outline-none focus:border focus:border-green-700 bg-white font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
                    type="number"
                  />
                </div>
                <div className="flex flex-col w-full md:w-2/5 my-1">
                  <label
                    htmlFor="City"
                    className="text-gray-200 text-left text-sm font-bold leading-tight tracking-normal my-2"
                  >
                    Group 1
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
                        groupOne
                          .filter((pla) => {
                            let n = pla.player.player_name;
                            return (
                              n !== selections.selections[twoIndex].selection
                            );
                          })
                          .sort((a, b) => {
                            return a < b ? 1 : -1;
                          })
                          .map((p) => {
                            const name = p.player.player_name;
                            return (
                              <option
                                value={name}
                                name={name}
                                key={p.player.player_id}
                                playerid={p.player.player_id}
                                selection="selectionOne"
                                selectionid="selectionOneId"
                              >
                                {p.number}. {name}
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
                    Group 1
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
                        groupOne
                          .filter((pla) => {
                            let n = pla.player.player_name;
                            return (
                              n !== selections.selections[oneIndex].selection
                            );
                          })
                          .sort((a, b) => {
                            return a < b ? 1 : -1;
                          })
                          .map((p) => {
                            const name = p.player.player_name;
                            return (
                              <option
                                value={name}
                                name={name}
                                key={p.player.player_id}
                                playerid={p.player.player_id}
                                selection="selectionTwo"
                                selectionid="selectionTwoId"
                              >
                                {p.number}. {name}
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
                    Group 2
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
                        groupTwo
                          .filter((pla) => {
                            let n = pla.player.player_name;
                            return (
                              n !== selections.selections[fourIndex].selection
                            );
                          })
                          .sort((a, b) => {
                            return a < b ? 1 : -1;
                          })
                          .map((p) => {
                            const name = p.player.player_name;
                            return (
                              <option
                                value={name}
                                name={name}
                                key={p.player.player_id}
                                playerid={p.player.player_id}
                                selection="selectionThree"
                                selectionid="selectionThreeId"
                              >
                                {p.number}. {name}
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
                    Group 2
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
                        groupTwo
                          .filter((pla) => {
                            let n = pla.player.player_name;
                            return (
                              n !== selections.selections[threeIndex].selection
                            );
                          })
                          .sort((a, b) => {
                            return a < b ? 1 : -1;
                          })
                          .map((p) => {
                            const name = p.player.player_name;
                            return (
                              <option
                                value={name}
                                name={name}
                                key={p.player.player_id}
                                playerid={p.player.player_id}
                                selection="selectionFour"
                                selectionid="selectionFourId"
                              >
                                {p.number}. {name}
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
                    Group 3
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
                        groupThree
                          .filter((pla) => {
                            let n = pla.player.player_name;
                            return (
                              n !== selections.selections[sixIndex].selection
                            );
                          })
                          .sort((a, b) => {
                            return a < b ? 1 : -1;
                          })
                          .map((p) => {
                            const name = p.player.player_name;
                            return (
                              <option
                                value={name}
                                name={name}
                                key={p.player.player_id}
                                playerid={p.player.player_id}
                                selection="selectionFive"
                                selectionid="selectionFiveId"
                              >
                                {p.number}. {name}
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
                    Group 3
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
                        groupThree
                          .filter((pla) => {
                            let n = pla.player.player_name;
                            return (
                              n !== selections.selections[fiveIndex].selection
                            );
                          })
                          .sort((a, b) => {
                            return a < b ? 1 : -1;
                          })
                          .map((p) => {
                            const name = p.player.player_name;
                            return (
                              <option
                                value={name}
                                name={name}
                                key={p.player.player_id}
                                playerid={p.player.player_id}
                                selection="selectionSix"
                                selectionid="selectionSixId"
                              >
                                {p.number}. {name}
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
