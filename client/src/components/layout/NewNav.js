import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function NewNav() {
  const [show, setShow] = useState(null);
  const [profile, setProfile] = useState(false);

  return (
    <>
      <div className="h-full w-full">
        {/* Code block starts */}
        <nav className="w-full bg-gray-900 hidden lg:block shadow">
          <div className="container px-6 h-16 flex justify-between items-center lg:items-stretch mx-auto">
            <div className="flex items-center">
              <div className="mr-10 flex items-center text-green-400">
                <NavLink
                  to="/"
                  activeClassName="selected"
                  className="cursor-pointer"
                >
                  <h3 className="text-2xl text-green-400 font-bold tracking-normal leading-tight ml-3 hidden lg:block">
                    Mastery
                  </h3>
                </NavLink>
              </div>
              <ul className="hidden lg:flex items-center h-full pt-1">
                <NavLink
                  to="/new-entry"
                  activeClassName="selected"
                  className="cursor-pointer"
                >
                  <li className="cursor-pointer h-full flex items-center text-sm hover:text-green-400 text-gray-200 mx-5 tracking-normal transition duration-150 ease-in-out">
                    <span className="mr-2">
                      <svg
                        class="w-6 h-6"
                        fill="none"
                        width={20}
                        height={20}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 5l7 7-7 7M5 5l7 7-7 7"
                        ></path>
                      </svg>
                    </span>
                    Enter
                  </li>
                </NavLink>
                <NavLink
                  to="/scores"
                  activeClassName="selected"
                  className="cursor-pointer"
                >
                  <li className="cursor-pointer h-full flex items-center text-sm  hover:text-green-400 text-gray-200 mx-5 tracking-normal transition duration-150 ease-in-out">
                    <span className="mr-2">
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
                    </span>
                    Live Scores
                  </li>
                </NavLink>
                <NavLink
                  to="/scores"
                  activeClassName="font-bold"
                  className="cursor-pointer"
                >
                  <li className="cursor-pointer h-full flex items-center text-sm  hover:text-green-400 text-gray-200 mx-5 tracking-normal transition duration-150 ease-in-out">
                    <span className="mr-2">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                    About
                  </li>
                </NavLink>
              </ul>
            </div>
          </div>
        </nav>
        {/* Navbar */}
        <nav>
          <div className="py-4 px-6 w-full  flex lg:hidden justify-between items-center bg-gray-900 fixed top-0 z-40">
            <div className="w-24 text-green-400">
              <NavLink to="/">
                <h3 className="text-green-500 font-bold text-xl tracking-normal leading-tight ml-3">
                  Mastery
                </h3>
              </NavLink>
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                aria-label="Home"
                height={44}
                viewBox="0 0 24 24"
                enableBackground="new 0 0 300 300"
                width={43}
                id="logo"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg> */}
            </div>
            <div>
              <div
                id="menu"
                className="text-green-500"
                onClick={() => setShow(!show)}
              >
                {show ? (
                  ' '
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-menu-2"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1={4} y1={6} x2={20} y2={6} />
                    <line x1={4} y1={12} x2={20} y2={12} />
                    <line x1={4} y1={18} x2={20} y2={18} />
                  </svg>
                )}
              </div>
            </div>
          </div>
          {/*Mobile responsive sidebar*/}
          <div
            className={
              show
                ? 'w-full h-full absolute z-40 xl:hidden transform  translate-x-0 '
                : '   w-full h-full absolute z-40 xl:hidden transform -translate-x-full'
            }
          >
            <div
              className="bg-gray-900 opacity-50 w-full h-full"
              onClick={() => setShow(!show)}
            />
            <div className="w-64 z-40 fixed overflow-y-auto z-40 top-0 bg-gray-900 shadow h-full flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
              <div className="px-6 h-full">
                <div className="flex flex-col justify-between h-full w-full">
                  <div>
                    <div className="mt-6 flex-1 flex w-full items-center justify-between">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <Link to="/">
                            <p className="text-green-400 font-bold text-xl">
                              Mastery
                            </p>
                          </Link>
                        </div>
                        <div
                          id="cross"
                          className="text-green-400"
                          onClick={() => setShow(!show)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-x"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <line x1={18} y1={6} x2={6} y2={18} />
                            <line x1={6} y1={6} x2={18} y2={18} />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <ul className="f-m-m text-green-400">
                      <NavLink
                        activeClassName="font-bold"
                        className="cursor-pointer "
                        exact
                        to="/scores"
                      >
                        <li className=" pt-8">
                          <div className="flex items-center">
                            <div className="w-6 h-6 md:w-8 md:h-8 ">
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
                            </div>
                            <p className=" lg:text-base text-base ml-3">
                              Live Scores
                            </p>
                          </div>
                        </li>
                      </NavLink>
                      <NavLink
                        activeClassName="font-bold"
                        className="cursor-pointer "
                        exact
                        to="/new-entry"
                      >
                        <li className="pt-8">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-6 h-6 md:w-8 md:h-8 ">
                                <svg
                                  class="w-6 h-6"
                                  fill="none"
                                  width={20}
                                  height={20}
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                                  ></path>
                                </svg>
                              </div>
                              <p className=" text-base ml-3">Enter Now</p>
                            </div>
                          </div>
                        </li>
                      </NavLink>
                      <NavLink
                        activeClassName="font-bold"
                        className="cursor-pointer "
                        exact
                        to="/faq"
                      >
                        <li className="pt-8">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-6 h-6 md:w-8 md:h-8 ">
                                <svg
                                  className="w-6 h-6"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </div>
                              <p className=" text-base ml-3">About</p>
                            </div>
                          </div>
                        </li>
                      </NavLink>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {/* Sidebar ends */}
        {/* Code block ends */}
      </div>
    </>
  );
}
