import React, { useContext, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { GlobalContext } from '../../context/GlobalState';
import { NavLink, Link } from 'react-router-dom';

function NewNavTwo() {
  const { getUsers, getScoreData, getWorldRankings, getEntries, getCastlebar } =
    useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    getScoreData();
    getUsers();
    getEntries();
    getWorldRankings();
    getCastlebar();

    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <nav className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/">
                  <p className="text-yellow-500 font-bold text-xl">Mastery</p>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavLink
                    to="/enter"
                    activeClassName="font-bold"
                    className=" hover:bg-yellow-500 text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                  >
                    Enter
                  </NavLink>
                  {/* <NavLink
                    to="/scores"
                    activeClassName="font-bold"
                    className=" hover:bg-yellow-500 text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                  >
                    Scores
                  </NavLink> */}
                  <NavLink
                    to="/faq"
                    activeClassName="font-bold"
                    className=" hover:bg-yellow-500 text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                  >
                    About
                  </NavLink>
                  {/* <NavLink
                    to="/test"
                    activeClassName="font-bold"
                    className=" hover:bg-yellow-500 text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                  >
                    Test
                  </NavLink> */}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-transparent inline-flex items-center justify-center p-2 rounded-md text-yellow-500 hover:text-white hover:bg-yellow-500 "
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* <NavLink
                onClick={() => setIsOpen(!isOpen)}
                to="/enter"
                activeClassName="font-bold"
                className="text-left hover:bg-yellow-500 text-white block px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
              >
                Enter
              </NavLink> */}
              {/* <NavLink
                onClick={() => setIsOpen(!isOpen)}
                to="/scores"
                activeClassName="font-bold"
                className="text-left hover:bg-yellow-500 text-white block px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
              >
                Scores
              </NavLink> */}
              <NavLink
                onClick={() => setIsOpen(!isOpen)}
                to="/faq"
                activeClassName="font-bold"
                className="text-left hover:bg-yellow-500 text-white block px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
              >
                About
              </NavLink>
            </div>
          </div>
        </Transition>
      </nav>
    </div>
  );
}

export default NewNavTwo;
