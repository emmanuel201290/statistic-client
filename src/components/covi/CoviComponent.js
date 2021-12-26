import React, { useContext, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { AuthContext } from '../auth/AuthContext';
import { CreateCoviModal } from './CreateCoviModal';
import { NavbarSecundary } from '../ui/NavbarSecundary';
import { Rowdata } from '../ui/Rowdata';

export const CoviComponent = () => {
  const [limit, setLimit] = useState(200);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [rowSelected, setRowSelected] = useState({});
  const { dataCoviFilter, statistic, globalStatistic, isLoad } = useContext(AuthContext);

  return (
    <>
      <NavbarSecundary setLimit={setLimit} statistic={statistic} />
      <div className="custom-body">
        {statistic && !isLoad ? (
          <>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Countries</th>
                  <th>Active </th>
                  <th>Newer</th>
                  <th>Recovered</th>
                  <th>Death (g)</th>
                  <th>Test</th>
                </tr>
              </thead>
              {
                <Rowdata
                  information={dataCoviFilter?.length > 0 ? dataCoviFilter : statistic}
                  limit={limit}
                  setIsOpenUpdate={setIsOpenUpdate}
                  setRowSelected={setRowSelected}
                />
              }
            </table>

            <div className="custom-counter-pagination">
              <div>
                {limit > statistic.length ? statistic.length : limit} of {statistic.length}
              </div>
            </div>
          </>
        ) : (
          <div className="alert alert-info custom-">Loading covi-19 statistic . . . . </div>
        )}

        <div className="custom-information-covi">
          <p>
            The data is collected from various sources that are updated at different times and do not always coincide.
            Some locations may not provide complete information.
          </p>

          <h3>About coronavirus</h3>
          <p>
            The 2019 coronavirus disease, better known as COVID-19 and incorrectly called coronavirus pneumonia, is an
            infectious disease caused by SARS-CoV-2. It produces flu-like or cold-like symptoms, including fever, cough,
            dyspnea, myalgia, and fatigue. In severe cases, it is characterized by pneumonia, acute respiratory distress
            syndrome, sepsis and septic shock that leads to about 3.75% of those infected to death according to the WHO.
            There is no specific treatment; the main therapeutic measures are to relieve symptoms and maintain vital
            functions.
          </p>
        </div>
        <p>Information global about cases</p>
        <div className="custom-statistic">
          <div className="custom-active">
            <h4>Active</h4>
            <p>{globalStatistic?.active}</p>
          </div>
          <div className="custom-recovered">
            <h4>Recovered</h4>
            <p>{globalStatistic?.recovered}</p>
          </div>
          <div className="custom-death">
            <h4>Death</h4>
            <p>{globalStatistic?.death} </p>
          </div>
        </div>
      </div>

      {isOpenUpdate && (
        <CSSTransition
          in={isOpenUpdate}
          timeout={0}
          classNames={{
            appear: 'fade-transition-update-appear',
            appearActive: 'fade-transition-update-active',
            appearDone: 'fade-transition-update-active',
          }}
          unmountOnExit={true}
          appear={true}
        >
          <CreateCoviModal setIsOpenUpdate={setIsOpenUpdate} rowSelected={rowSelected} />
        </CSSTransition>
      )}
    </>
  );
};
