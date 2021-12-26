import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { AuthContext } from '../auth/AuthContext';
import { types } from '../types/types';
import { fecthDataWithoutToken } from '../helpers/apiData';
import { CreateUserModal } from './CreateUserModal';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { CircularProgress } from '@material-ui/core';

export const Login = ({ history }) => {
  const { dispatch, user } = useContext(AuthContext);
  const [isWait, setIsWait] = useState(false);

  const [formLoginValues, handleLoginInputChange] = useForm({
    email: 'enmanuelmartinez89@yahoo.es',
    password: '123456',
  });

  const { email, password } = formLoginValues;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsWait(true);
    await fecthDataWithoutToken('login', formLoginValues, 'POST')
      .then((response) => {
        dispatch({
          type: types.login,
          payload: response.data,
        });
        history.replace('/');
      })
      .catch((error) => {
        const { data } = error.response;
        return Swal.fire('Verify your information', data.msg, 'error');
      });
    setIsWait(false);
  };

  const handleCreateUser = () => {
    dispatch({ type: types.openModel });
  };

  const handleCloseModel = () => {
    dispatch({ type: types.closeModel });
  };
  return (
    <>
      <form className="form" onSubmit={handleLogin}>
        <h1>
          <strong style={{ color: '#343A40' }}>Sign In</strong>
        </h1>

        <strong style={{ color: 'white' }}>
          <FontAwesomeIcon icon={faUserCircle} />
        </strong>

        <hr />
        <div className="form-group">
          <input
            type="text"
            name="email"
            className="form-control"
            placeholder="Email Address"
            autoComplete="false"
            value={email}
            onChange={handleLoginInputChange}
            disabled={isWait ? true : false}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={handleLoginInputChange}
          />
        </div>

        <button type="submit" className="btn">
          <strong>Log in</strong>
        </button>
        <div className="custom-login-text">
          <p>Don't have an account ?</p>

          <Link className="App-link" onClick={handleCreateUser} to="">
            <strong>Sigh Up</strong>
          </Link>
        </div>
        {isWait && <CircularProgress color="secondary" />}
      </form>

      <CSSTransition
        in={user.openModel}
        timeout={0}
        classNames={{
          appear: 'fade-transition-appear',
          appearActive: 'fade-transition-active',
          appearDone: 'fade-transition-active',
        }}
        unmountOnExit={true}
        appear={true}
      >
        <CreateUserModal handleCloseModel={handleCloseModel} />
      </CSSTransition>
    </>
  );
};
