import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import { AuthContext } from '../auth/AuthContext';
import { fecthDataWithoutToken } from '../helpers/apiData';
import { useForm } from '../hooks/useForm';
import { types } from '../types/types';

const initialValue = {
  email: '',
  password: '',
  password2: '',
};

Modal.setAppElement('#root');

export const CreateUserModal = ({ handleCloseModel }) => {
  const { dispatch } = useContext(AuthContext);
  const [formLoginValues, handleLoginInputChange, reset] = useForm(initialValue);
  const { email, password, password2 } = formLoginValues;

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    await fecthDataWithoutToken('signup', formLoginValues, 'POST')
      .then((response) => {
        dispatch({
          type: types.login,
          payload: response.data,
        });
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Your account was create',
          showConfirmButton: false,
          timer: 3000,
        });
      })
      .catch((error) => {
        const { data } = error.response;
        if (data.error === undefined) {
          Swal.fire('Verify your information', data.msg, 'error');
        } else {
          data.errors.map((inf) => {
            Swal.fire('Verify your information', inf.msg, 'error');
          });
        }
      });
    dispatch({ type: types.closeModel });
  };

  return (
    <form onSubmit={handleSubmitForm} className="form-modal">
      <h3 className="custom-text-model">Sigh Up</h3>
      <hr />
      <div className="form-group">
        <input
          type="text"
          className={`form-control  'is-invalid'`}
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleLoginInputChange}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className={`form-control  'is-invalid'`}
          placeholder="Password minimun 6 character"
          name="password"
          autoComplete="false"
          value={password}
          onChange={handleLoginInputChange}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className={`form-control  'is-invalid'`}
          placeholder="Confirm your password"
          name="password2"
          autoComplete="false"
          value={password2}
          onChange={handleLoginInputChange}
        />
      </div>
      <hr />
      <button type="submit" class="btn btn-success">
        Success
      </button>
      <button type="button" class="btn btn-danger" onClick={handleCloseModel}>
        Close
      </button>
    </form>
  );
};
