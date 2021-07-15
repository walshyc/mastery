import React from 'react';

const NewFooter = () => {
  return (
    <div className="bg-gray-800 text-yellow-500 py-4 flex flex-col items-center justify-center f-f-l">
      <div className="flex items-center justify-center py-2">
        <a
          className="cursor-pointer"
          href="https://twitter.com/walshy_c"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={22}
              height={18}
              viewBox="0 0 22 18"
              fill="none"
              className="fill-current text-yellow-500"
            >
              <path d="M21 1.01001C20 1.50001 19.02 1.69901 18 2.00001C16.879 0.735013 15.217 0.665013 13.62 1.26301C12.023 1.86101 10.977 3.32301 11 5.00001V6.00001C7.755 6.08301 4.865 4.60501 3 2.00001C3 2.00001 -1.182 9.43301 7 13C5.128 14.247 3.261 15.088 1 15C4.308 16.803 7.913 17.423 11.034 16.517C14.614 15.477 17.556 12.794 18.685 8.77501C19.0218 7.55268 19.189 6.28987 19.182 5.02201C19.18 4.77301 20.692 2.25001 21 1.00901V1.01001Z" />
            </svg>
          </div>
        </a>
        <a
          className="cursor-pointer"
          href="https://github.com/walshyc/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="px-2">
            <svg
              role="img"
              width={22}
              height={22}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current text-yellow-500"
            >
              <title>GitHub icon</title>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </div>
        </a>
        <a
          className="cursor-pointer"
          href="mailto:conorwalsh0703@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="px-2">
            <svg
              width={26}
              height={26}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
        </a>
      </div>
      <div></div>
      <div className="pt-2 flex flex-col justify-center items-center">
        <p className="lg:text-base text-xs text-yellow-500 leading-5">
          2021 Conor Walsh
        </p>
        <p className="lg:text-bold mt-2 text-yellow-500 leading-5">
          Want to use Mastery for your club in the future.{' '}
          <a
            className="cursor-pointer font-bold"
            href="mailto:conorwalsh0703@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >Get in touch here</a>{' '}
        </p>
      </div>
    </div>
  );
};

export default NewFooter;
