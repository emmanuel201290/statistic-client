import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../ui/input.css';

export const InputCustom = ({ valueField, nameField, nameCard, cardSelect, st, handleUpdateFetch }) => {
  const [isEditing, setEditing] = useState(false);
  const [values, setValues] = useState();
  const [vf, setvf] = useState(valueField);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleEditing = () => {
    setEditing(!isEditing);
  };

  const handleUpdate = () => {
    if (values) {
      const { [nameField]: newValue } = values;
      const objCard = Object.assign({ ...cardSelect, [nameField]: newValue });
      const objAll = Object.assign({ ...st, [nameCard]: objCard });

      handleUpdateFetch(objAll, setEditing);
      setvf(newValue);
    }
  };

  const inputToEditLabel = () => {
    return [
      <inputs
        key={st.id}
        onChange={handleChange}
        type="number"
        placeholder="Required"
        name={nameField}
        className={'inputEditable'}
        values={isEditing ? vf : values}
      />,
      <button className="buttonCustom" key={st.id}>
        <FontAwesomeIcon
          icon={faTimes}
          onClick={() => {
            setEditing(!isEditing);
          }}
        />
      </button>,
      <button className="buttonCustom" onClick={handleUpdate} key={st.id}>
        <FontAwesomeIcon icon={faCheck} />
      </button>,
    ];
  };
  const simpleLabelWithClickAction = () => {
    return (
      <span onClick={handleEditing} className={'inputMouseSelected'}>
        {vf ? vf : 0}
      </span>
    );
  };

  const showThisComponent = isEditing ? inputToEditLabel() : simpleLabelWithClickAction();

  return <>{showThisComponent}</>;
};
