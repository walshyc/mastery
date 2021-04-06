import React, { Fragment } from 'react';
import spinner from './loading.gif';

export const Spinner = () => (
  <>
    <div className="flex justify-center min-h-screen">
      <button type="button" class="bg-transparent w-1/2 flex justify-center" disabled>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 animate-spin text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
          />
        </svg>
        Loading
      </button>
    </div>
  </>
);

export default Spinner;
