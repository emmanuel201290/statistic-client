import React from 'react';

export const Rowdata = ({ information, limit = 10, setIsOpenUpdate, setRowSelected }) => {
  const updateStatistic = (nameObjectSelected, nameFieldSelect, objectToUpdate) => {
    console.log('nameObject selected: ', nameObjectSelected);
    setIsOpenUpdate(true);
    setRowSelected({ nameObjectSelected, nameFieldSelect, objectToUpdate });
  };

  return (
    <>
      {information.slice(limit - 10, limit).map((st) => (
        <tr key={st._id}>
          <td className="custom-column-contry">{st.country}</td>
          <td
            className="custom-colum-active"
            onClick={() => {
              updateStatistic('cases', 'active', st);
            }}
          >
            <label>{st.cases.active}</label>
          </td>
          <td className="custom-colum-newer">
            <label>{st.cases.newer === undefined || null ? 0 : st.cases.newer}</label>
          </td>
          <td
            className="custom-colum-recovered"
            onClick={() => {
              updateStatistic('cases', 'recovered', st);
            }}
          >
            <label>{st.cases.recovered === undefined || st.cases.recovered === null ? 0 : st.cases.recovered}</label>
          </td>
          <td
            className="custom-colum-death"
            onClick={() => {
              updateStatistic('deaths', 'total', st);
            }}
          >
            <label>{st.deaths.total === undefined || st.deaths.total === null ? 0 : st.deaths.total}</label>
          </td>
          <td className="custom-colum-test">
            <label>{st.tests.total === undefined || st.tests.total === null ? 0 : st.tests.total}</label>
          </td>
        </tr>
      ))}
    </>
  );
};
