import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';


import graphic from '../static/images/landing.png';
function FAQ() {
  const [show, setShow] = useState(null);
  return (
    <>
      <div className="mx-auto container f-f-p px-4 xl:px-0 my-8 pt-8 min-h-screen ">
        <h1 className="text-center text-gray-900 text-2xl lg:text-5xl font-bold tracking-wider leading-10">
          About
        </h1>
        <div className="lg:flex flex-wrap py-8 md:py-10 lg:py-14  xl:py-20 text-lg">
          <div className="w-full">
            <div>
              <div className="flex py-2 xl:py-4 mb-4 justify-between items-center border-b border-gray-200">
                <h1 className="text-gray-800 tracking-wide">
                  How can I enter?
                </h1>
                <div data-menu className="cursor-pointer text-gray-800">
                  {show === 0 ? (
                    <svg
                      className="w-6 h-6"
                      onClick={() => setShow(null)}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      onClick={() => setShow(0)}
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </div>
              </div>
              {show === 0 && (
                <ul>
                  <li className="pt-1 pb-2">
                    <p className="xl:w-10/12 w-full text-gray-800 text-left text-sm">
                      You can add a team <Link to="/new-entry">here.</Link> Each
                      team comprises of 6 golfers, 2 USA players, 2 Europeans
                      and 2 from the Rest of the World
                    </p>
                  </li>
                </ul>
              )}
            </div>
            <div>
              <div className="flex py-2 xl:py-4 mb-4 justify-between items-center border-b border-gray-200">
                <h1 className="text-gray-800 tracking-wide">
                  How much does it cost?
                </h1>
                <div data-menu className="cursor-pointer text-gray-800">
                  {show === 1 ? (
                    <svg
                      className="w-6 h-6"
                      onClick={() => setShow(null)}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      onClick={() => setShow(1)}
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </div>
              </div>
              {show === 1 && (
                <ul>
                  <li className="pt-1 pb-2">
                    <p className="xl:w-10/12 w-full text-gray-800 text-left text-sm">
                      Each entry of 6 golfers cost €5. You can enter 3 teams for
                      for €12.50!
                    </p>
                  </li>
                </ul>
              )}
            </div>
            <div>
              <div className="flex py-2 xl:py-4 mb-4 justify-between items-center border-b border-gray-200">
                <h1 className="text-gray-800 tracking-wide">
                  How does the scoring work?
                </h1>
                <div data-menu className="cursor-pointer text-gray-800">
                  {show === 2 ? (
                    <svg
                      className="w-6 h-6"
                      onClick={() => setShow(null)}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      onClick={() => setShow(2)}
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </div>
              </div>
              {show === 2 && (
                <ul>
                  <li className="pt-1 pb-2">
                    <p className="xl:w-10/12 w-full text-gray-800 text-left text-sm">
                      You can add a team <Link to="/new-entry">here.</Link> Each
                      team comprises of 6 golfers, 2 USA players, 2 Europeans
                      and 2 from the Rest of the World
                    </p>
                  </li>
                </ul>
              )}
            </div>

            <div>
              <div className="flex py-2 xl:py-4 mb-4 justify-between items-center border-b border-gray-200">
                <h1 className="text-gray-800 tracking-wide">
                  How much can I win?
                </h1>
                <div data-menu className="cursor-pointer text-gray-800">
                  {show === 4 ? (
                    <svg
                      className="w-6 h-6"
                      onClick={() => setShow(null)}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      onClick={() => setShow(4)}
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </div>
              </div>
              {show === 4 && (
                <ul>
                  <li className="pt-1 pb-2">
                    <p className="xl:w-10/12 w-full text-gray-800 text-left text-sm">
                      1st Place - €300 <br />
                      2nd Place - €160 <br />
                      3rd Place - €40 <br />
                    </p>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="container mx-auto flex justify-center">
          <div className=" sm:w-2/3 w-8/12 flex justify-center">
            <img src={graphic} alt="golfer" className="md:w-96" />
          </div>
        </div>
        <div className="w-11/12 sm:w-2/3 flex justify-center items-center mt-10 mb-10 ">
          <div className="flex items-start">
            <Link to="/new-entry">
              <button className="flex items-center justify-center hover:text-white hover:bg-gray-900 hover:border-gray-900 border bg-white transition duration-150 ease-in-out focus:outline-none  rounded text-gray-900 px-4 sm:px-8 py-1 sm:py-3 text-lg shadow-xl">
                <svg
                  class="w-6 h-6"
                  width={20}
                  height={20}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  ></path>
                </svg>
                <span className="pl-1">Enter Now</span>
              </button>
            </Link>
            <Link to="/scores">
              <button className="flex items-center justify-center shadow-xl hover:bg-white hover:text-gray-900 hover:border-green-600 ml-3 sm:ml-6 bg-transparent transition duration-150 ease-in-out focus:outline-none hover:bg-green-700-800 rounded border border-white text-white px-4 sm:px-8 py-1 sm:py-3 text-lg">
                <svg
                  class="w-6 h-6"
                  width={20}
                  height={20}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  ></path>
                </svg>{' '}
                <span className="pl-1">Live Scores</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default FAQ;
