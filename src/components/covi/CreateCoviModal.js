import React, { useContext } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { fetchDataWithToken } from '../helpers/apiData';
import { AuthContext } from '../auth/AuthContext';
import { useForm } from '../hooks/useForm';

const initialValue = {
  infoActive: '',
};

Modal.setAppElement('#root');
export const CreateCoviModal = ({ setIsOpenUpdate, rowSelected }) => {
  const {
    nameObjectSelected,
    nameFieldSelect,
    objectToUpdate,
  } = rowSelected; /** This information is set in RowData class **/

  const [formUpdateInfo, setFormUpdateInfo] = useForm(initialValue);
  const { infoActive } = formUpdateInfo;
  const { user, setStatistic } = useContext(AuthContext);
  const { token } = user;

  /**Update information selected in the table */
  const handleUpdateField = async (e) => {
    e.preventDefault();

    /** Add to the old object the new value that we can update **/
    const newObjectUpdate = Object.assign({
      ...objectToUpdate[nameObjectSelected],
      [nameFieldSelect]: infoActive,
    });

    const result = {
      [nameObjectSelected]: newObjectUpdate,
    };

    await fetchDataWithToken(`/update/${objectToUpdate._id}`, token, 'POST', result)
      .then((response) => {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Your data have been updated',
          showConfirmButton: false,
          timer: 3000,
        });
        setIsOpenUpdate(false);
        refreshInformation();
      })
      .catch((error) => {
        const { data } = error.response;
        data.errors.map((inf) => {
          Swal.fire('Data could not updated', inf.msg, 'error');
        });
      });
  };

  const refreshInformation = async (e) => {
    const { data } = await fetchDataWithToken('/getAll', token, 'GET');
    setStatistic(data.statisticBD);
  };

  return (
    <form onSubmit={handleUpdateField} className="form-modal-update">
      <label>
        <strong>Country selected:</strong> {objectToUpdate.country}
      </label>
      <hr />

      <input
        aria-label="Last name"
        className="form-control"
        disabled
        type="text"
        value={objectToUpdate[nameObjectSelected][nameFieldSelect]}
      ></input>
      <input
        aria-label="Last name"
        autoComplete="off"
        className="form-control"
        name="infoActive"
        onChange={setFormUpdateInfo}
        placeholder="New value to update"
        type="number"
        value={infoActive}
      ></input>

      <button type="button" class="btn btn-primary" type="submit">
        Update
      </button>
      <br />
      <button
        class="btn btn-danger"
        onClick={() => {
          setIsOpenUpdate(false);
        }}
        type="button"
      >
        Close
      </button>
    </form>
  );
};
