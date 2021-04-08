import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

const Tiebreaker = (props) => {
  const { addTie } = useContext(GlobalContext);

  const history = useHistory();

  const [total, setTotal] = useState('');
  const [name, setName] = useState(props.location.state.entry);
  const [email, setEmail] = useState('');
  const [teamName, setTeamName] = useState('');
  const [finalRound, setFinalRound] = useState('');
  console.log(name);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTie(name, email, total);
    history.push('/');
  };

  return (
    <div className="flex flex-col justify-start items-start min-h-screen w-10/12 mx-5">
      <h2 className="text-3xl font-bold my-3">Tiebreaker</h2>
      <p className="text-left">
        In the event of two or more teams finishing on equal scores, a
        tiebreaker will be required.
      </p>
      <p className='text-left mt-1'>
        Please enter your email and answer below. Your team name is filled in
        already. This will be used to help seperate two or more entries when
        finishing level.
      </p>
      <form
        className="w-full flex flex-col justify-start"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full md:w-1/2 my-2">
          <label
            htmlFor="team"
            className="text-gray-900 text-left text-sm font-bold leading-tight tracking-normal mb-2"
          >
            Team Name
          </label>
          <input
            id="team"
            onChange={({ target }) => setTeamName(target.value)}
            className="text-gray-900 focus:outline-none focus:border focus:border-green-700 bg-white font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
            placeholder=""
            value={props.location.state.entry}
            disabled
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2 my-2">
          <label
            htmlFor="email"
            className="text-gray-900 text-left text-sm font-bold leading-tight tracking-normal mb-2"
          >
            Email
          </label>
          <input
            id="email"
            onChange={({ target }) => setEmail(target.value)}
            className="text-gray-900 focus:outline-none focus:border focus:border-green-700 bg-white font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
            placeholder="Email used to enter"
          />
        </div>

        <div className="flex flex-col w-full md:w-1/2 my-2">
          <label
            htmlFor="entryName"
            className="text-gray-900 text-left text-sm font-bold leading-tight tracking-normal mb-2"
          >
            Total number of birdies scored in the final round.
          </label>
          <input
            id="totalScore"
            onChange={({ target }) => setTotal(target.value)}
            value={total}
            className="text-gray-900 focus:outline-none focus:border focus:border-green-700 bg-white font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
            placeholder="43"
          />
        </div>
        <button
          className="bg-gray-900 w-40 py-2 px-2 mr-auto rounded font-bold my-3 text-green-400"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Tiebreaker;
