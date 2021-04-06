import React, { useState } from 'react';
import data from '../../data';
export default function NewTable() {
  const [show, setShow] = useState(null);
  console.log(data);
  return (
    <>
      <div className="mx-auto container px-6 mt-24">
          {data.map((d,i) => {
              return(
                <div>
                <div className="flex pt-6 items-center">
                  <div className="cursor-pointer">
                    {show === i ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => setShow(null)}
                        aria-label="Show"
                        className="icon icon-tabler text-green-100 icon-tabler-chevron-down"
                        width={28}
                        height={28}
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
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => setShow(i)}
                        aria-label="Hide"
                        className=" icon icon-tabler text-green-100 icon-tabler-chevron-up"
                        width={28}
                        height={28}
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
                    )}
                  </div>
                  <h4 className="text-lg text-green-100 font-semibold ml-3">
                    {d.name}
                  </h4>
                  <h4 className="text-lg text-green-100 font-semibold ml-auto ">
                    -56
                  </h4>
                </div>
                {show == i && (
                  <table className="w-full shadow text-left text-green-100 table-auto">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="py-5 pl-2 sm:pl-10 w-1/4 text-base ">
                          Pos
                        </th>
                        <th className="py-5 w-1/4 text-base ">
                          Name
                        </th>
                        <th className="py-5 w-1/4 text-base  pl-20">
                         Played
                        </th>
                        <th className="py-5 w-1/4 text-base  pl-20">
                         Tday
                        </th>
                        <th className="py-5 w-1/4 text-base  pr-2 sm:pr-10 text-right">
                          Score
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="pl-2 sm:pl-10 pr-2 py-5 text-xs sm:text-sm">
                        1
                        </td>
                        <td className="pr-2 py-5 text-xs sm:text-sm">
                        JOHNSON, Dustin
                        </td>
                        <td className="pr-2 py-5 text-xs sm:text-sm text-center">
                          18
                        </td>
                        <td className="py-5 pr-2 sm:pr-10 text-xs sm:text-sm text-right">
                          -20
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
              )
          })}

        <hr className="mt-6 border-t border-gray-300 dark:border-gray-700" />

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
