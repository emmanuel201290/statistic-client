import React, { useEffect, useReducer, useState } from 'react';
import { AuthContext } from './components/auth/AuthContext';
import { AppRouter } from './components/router/AppRouter';
import { authReducer } from './components/auth/authReducer';
import { fetchDataWithToken } from '../src/components/helpers/apiData';
import './App.css';

const init = () => {
  return JSON.parse(localStorage.getItem('user')) || { logged: false };
};

function App() {
  const [user, dispatch] = useReducer(authReducer, {}, init);
  const [dataCoviFilter, setDataCoviFilter] = useState(false);
  const [statistic, setStatistic] = useState();
  const [globalStatistic, setGlobalStatistic] = useState();
  const [isLoad, setLoad] = useState(false);

  useEffect(async () => {
    const { token } = user;

    if (token) {
      let { data } = await fetchDataWithToken('/getAll', token, 'GET');

      if (data.ok) {
        setStatistic(data.statisticBD);

        setGlobalStatistic({
          active: data.active,
          recovered: data.recovered,
          death: data.death,
        });
      } else {
        data = await fetchDataWithToken('/', token, 'POST');
        setStatistic(data.statisticBD);
      }
    }
  }, [user]);
  return (
    <div className="App">
      <div className="App-header">
        <AuthContext.Provider
          value={{
            user,
            dispatch,
            dataCoviFilter,
            setDataCoviFilter,
            statistic,
            setStatistic,
            globalStatistic,
            isLoad,
            setLoad,
          }}
        >
          <AppRouter />
        </AuthContext.Provider>
      </div>
    </div>
  );
}

export default App;
