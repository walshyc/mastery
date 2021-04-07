import React from 'react';
import { Link } from 'react-router-dom';
import graphic from '../static/images/landing.png';
const Landing = () => {
  return (
    <div className="w-full h-screen bg-green-900">
      <div className="pt-8 relative sm:pt-16 bg-gradient-to-b from-green-400 to-green-900  mx-auto flex flex-col items-center pb-24 sm:pb-32 md:pb-48 lg:pb-56 xl:pb-64">
        <div className="w-11/12 sm:w-2/3 mb-5 sm:mb-10">
          <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center  text-white font-bold leading-tight">
            A Tradition Unlike <span className="italic">Any</span> Other...
          </h1>
        </div>
        <div className="w-11/12 sm:w-2/3 flex justify-center items-center mb-10 sm:mb-20">
          <div className="flex items-start">
            <Link to="/new-entry">
              <button className="flex items-center justify-center hover:text-white hover:bg-gray-900 hover:border-gray-900 border bg-white transition duration-150 ease-in-out focus:outline-none  rounded text-gray-900 px-4 sm:px-8 py-1 sm:py-3 text-lg shadow-xl">
                <svg
                  className="w-6 h-6"
                  width={20}
                  height={20}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  ></path>
                </svg>
                <span className="pl-1">Enter Now</span>
              </button>
            </Link>
            <Link to="/scores">
              <button className="flex items-center justify-center shadow-xl hover:bg-white hover:text-gray-900 hover:border-green-600 ml-3 sm:ml-6 bg-transparent transition duration-150 ease-in-out focus:outline-none hover:bg-green-700-800 rounded border border-white text-white px-4 sm:px-8 py-1 sm:py-3 text-lg">
                <svg
                  className="w-6 h-6"
                  width={20}
                  height={20}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  ></path>
                </svg>{' '}
                <span className="pl-1">Live Scores</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex justify-center md:-mt-56 -mt-20 sm:-mt-40">
        <div className="relative sm:w-2/3 w-8/12 flex justify-center">
          <img src={graphic} alt="golfer" className="absolute md:w-96" />
        </div>
      </div>
    </div>
  );
};

export default Landing;
