import React from 'react';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '90%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

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

  const classes = useStyles();

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
      selectionOne: '',
      selectionTwo: '',
      selectionThree: '',
      selectionFour: '',
      selectionOneId: '',
      selectionTwoId: '',
      selectionThreeId: '',
      selectionFourId: '',
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
          <div className="container mx-auto">
            <div className="my-8 mx-auto xl:w-full xl:mx-0">
              <div className="xl:flex lg:flex md:flex flex-wrap justify-between">
                <div className="flex flex-col mb-6 w-full">
                  <h3 className="pb-2 text-xl tracking-wider font-bold text-gray-900">
                    Entry {number}
                  </h3>
                  <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                    <label
                      htmlFor="LastName"
                      className="pb-2 text-lg tracking-wider font-bold text-gray-900"
                    >
                      Entry Name
                    </label>
                    <input
                      onChange={handleChange}
                      value={selections.entryName}
                      type="text"
                      name="entryName"
                      required
                      id="entryName"
                      className="border-2 bg-white border-gray-300 dark:border-gray-900 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-gray-900 text-gray-900 dark:text-gray-100"
                      placeholder="Optional"
                    />
                  </div>
                </div>

                <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                  <label
                    htmlFor="City"
                    className="pb-2 text-lg tracking-wider font-bold text-gray-900 dark:text-gray-100"
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
                      className="bg-white dark:bg-gray-800 appearance-none z-10 pl-3 py-3 w-full text-sm border border-transparent focus:outline-none focus:border-gray-900  text-gray-900  rounded"
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
                <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                  <label
                    htmlFor="City"
                    className="pb-2 text-lg tracking-wider font-bold text-gray-900 dark:text-gray-100"
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
                      className="bg-white dark:bg-gray-800 appearance-none z-10 pl-3 py-3 w-full text-sm border border-transparent focus:outline-none focus:border-gray-900  text-gray-900  rounded"
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
                <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                  <label
                    htmlFor="City"
                    className="pb-2 text-lg tracking-wider font-bold text-gray-900 dark:text-gray-100"
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
                      className="bg-white dark:bg-gray-800 appearance-none z-10 pl-3 py-3 w-full text-sm border border-transparent focus:outline-none focus:border-gray-900  text-gray-900  rounded"
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
                <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                  <label
                    htmlFor="City"
                    className="pb-2 text-lg tracking-wider font-bold text-gray-900 dark:text-gray-100"
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
                      className="bg-white dark:bg-gray-800 appearance-none z-10 pl-3 py-3 w-full text-sm border border-transparent focus:outline-none focus:border-gray-900  text-gray-900  rounded"
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
                <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                  <label
                    htmlFor="City"
                    className="pb-2 text-lg tracking-wider font-bold text-gray-900 dark:text-gray-100"
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
                      className="bg-white dark:bg-gray-800 appearance-none z-10 pl-3 py-3 w-full text-sm border border-transparent focus:outline-none focus:border-gray-900  text-gray-900  rounded"
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
                <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                  <label
                    htmlFor="City"
                    className="pb-2 text-lg tracking-wider font-bold text-gray-900 dark:text-gray-100"
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
                      className="bg-white dark:bg-gray-800 appearance-none z-10 pl-3 py-3 w-full text-sm border border-transparent focus:outline-none focus:border-gray-900  text-gray-900  rounded"
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
        <div className="w-full py-4 sm:px-12 px-4 bg-gray-900  mt-6 flex justify-end rounded-bl rounded-br">
          <button className="btn text-sm focus:outline-none text-gray-100  border border-gray-300  py-2 px-6 mr-4 rounded hover:bg-gray-700 transition duration-150 ease-in-out">
            Pay
          </button>
          <button
            className="bg-green-700 transition duration-150 ease-in-out hover:bg-green-600 rounded text-white px-8 py-2 text-sm focus:outline-none"
            type="submit"
          >
            Add Another Team
          </button>
        </div>
      </div>
    </>
  );
};

export default TeamForm;
