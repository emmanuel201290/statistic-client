import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { types } from '../types/types';
import '../../App';
import { Button } from '@material-ui/core';

export const Navbar = () => {
  const {
    user: { email },
    dispatch,
    setLoad,
  } = useContext(AuthContext);

  const history = useHistory();

  const handleLogout = () => {
    dispatch({
      type: types.logout,
    });
    setLoad(false);
    history.replace('/login');
  };

  return (
    <div className="container-navbar">
      <div className="userName">
        <span className="nav-item">{email}</span>
      </div>
      <div className="custom-navbar">
        <li>
          <a
            href="https://github.com/emmanuel201290/statistic-server"
            target="noopener"
            rel="noopener"
            style={{ color: 'white' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              className="navbar-nav-svg d-inline-block align-text-top"
              viewBox="0 0 512 499.36"
              role="img"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M256 0C114.64 0 0 114.61 0 256c0 113.09 73.34 209 175.08 242.9 12.8 2.35 17.47-5.56 17.47-12.34 0-6.08-.22-22.18-.35-43.54-71.2 15.49-86.2-34.34-86.2-34.34-11.64-29.57-28.42-37.45-28.42-37.45-23.27-15.84 1.73-15.55 1.73-15.55 25.69 1.81 39.21 26.38 39.21 26.38 22.84 39.12 59.92 27.82 74.5 21.27 2.33-16.54 8.94-27.82 16.25-34.22-56.84-6.43-116.6-28.43-116.6-126.49 0-27.95 10-50.8 26.35-68.69-2.63-6.48-11.42-32.5 2.51-67.75 0 0 21.49-6.88 70.4 26.24a242.65 242.65 0 0 1 128.18 0c48.87-33.13 70.33-26.24 70.33-26.24 14 35.25 5.18 61.27 2.55 67.75 16.41 17.9 26.31 40.75 26.31 68.69 0 98.35-59.85 120-116.88 126.32 9.19 7.9 17.38 23.53 17.38 47.41 0 34.22-.31 61.83-.31 70.23 0 6.85 4.61 14.81 17.6 12.31C438.72 464.97 512 369.08 512 256.02 512 114.62 397.37 0 256 0z"
              ></path>
            </svg>
          </a>
        </li>

        <li>
          <a href="https://statistic-server.herokuapp.com/api-docs/" target="noopener" rel="noopener">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              className="navbar-nav-svg d-inline-block align-text-top"
              viewBox="0 30 262 216.55"
              role="img"
            >
              <path
                d="M127.06 255.997C58.85 255.527-.457 198.918.003 126.998C.445 57.796 57.952-.469 129.11.003c69.157.46 127.503 57.864 126.885 128.191c.573 69.69-58.06 128.295-128.935 127.803zm0 0C58.85 255.527-.457 198.918.003 126.998C.445 57.796 57.952-.469 129.11.003c69.157.46 127.503 57.864 126.885 128.191c.573 69.69-58.06 128.295-128.935 127.803z"
                fill="#FFF"
              />
              <path
                d="M127.185 238.997C68.032 238.59 16.604 189.5 17.002 127.131c.384-60.012 50.253-110.54 111.961-110.129c59.972.399 110.569 50.18 110.033 111.167c.496 60.433-50.349 111.255-111.811 110.828zm0 0C68.032 238.59 16.604 189.5 17.002 127.131c.384-60.012 50.253-110.54 111.961-110.129c59.972.399 110.569 50.18 110.033 111.167c.496 60.433-50.349 111.255-111.811 110.828z"
                fill="#49A32B"
              />
              <path
                d="M169.327 127.956c-.284 5.29-4.906 9.683-9.46 8.917h-.069a9.133 9.133 0 0 1-9.145-9.124a9.276 9.276 0 0 1 9.427-8.96c5.045.025 9.52 4.288 9.247 9.167zM88.201 179.22c1.902.056 3.806.015 6 .015v13.786c-13.635 2.305-24.866-1.566-27.622-13.091a76.501 76.501 0 0 1-1.736-12.886c-.293-4.592.213-9.235-.137-13.819c-.97-12.612-2.603-16.918-14.706-17.514v-15.696a22.665 22.665 0 0 1 2.632-.452c6.636-.327 9.433-2.362 10.917-8.898a74.57 74.57 0 0 0 1.194-11.122c.526-7.217.34-14.551 1.542-21.651c1.737-10.267 8.111-15.255 18.64-15.814c2.996-.16 6.001-.024 9.396-.024v14.09c-1.397.1-2.677.303-3.95.265c-8.58-.263-9.023 2.66-9.65 9.762c-.39 4.454.149 8.984-.155 13.454a107.113 107.113 0 0 1-1.781 13.245c-1.238 6.339-5.135 11.053-10.535 15.053c10.483 6.823 11.676 17.423 12.357 28.188c.366 5.784.199 11.61.786 17.366c.457 4.467 2.195 5.607 6.808 5.743zm8.836-60.43h.162a9.078 9.078 0 0 1 8.928 9.226a8.884 8.884 0 0 1-9.396 8.851a9.046 9.046 0 1 1 .306-18.078zm31.236 0c5.483-.043 9.124 3.51 9.152 8.93c.03 5.565-3.422 9.125-8.868 9.149c-5.54.024-9.186-3.48-9.216-8.867a8.671 8.671 0 0 1 8.933-9.213zm65.4-6.867c1.459 5.447 4.298 7.362 10.032 7.623c.94.044 1.875.203 3.163.346v15.692c-.697.23-1.412.4-2.138.512c-7.684.478-11.186 3.63-11.962 11.335c-.496 4.919-.455 9.892-.796 14.828a125.806 125.806 0 0 1-1.476 16.18c-1.96 9.703-8.019 14.544-18.029 15.135c-3.221.19-6.466.03-9.94.03v-14.026c1.87-.115 3.52-.275 5.174-.314c5.981-.143 8.096-2.071 8.389-8.011c.324-6.525.465-13.059.757-19.586c.423-9.433 3.006-17.861 11.795-23.745c-5.03-3.585-9.067-7.928-10.112-13.783c-1.265-7.097-1.674-14.351-2.355-21.548c-.336-3.597-.32-7.226-.671-10.821c-.379-3.88-3.045-5.224-6.577-5.31c-2.024-.05-4.055-.01-6.642-.01V62.754c16.509-2.741 27.913 2.752 28.973 18.548c.443 6.632.378 13.297.803 19.93c.186 3.608.726 7.19 1.612 10.691z"
                fill="#FFF"
              />
            </svg>
          </a>
        </li>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};
