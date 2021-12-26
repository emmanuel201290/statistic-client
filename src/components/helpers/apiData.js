import axios from 'axios';

//const baseUrl = process.env.URL;
const fecthDataWithoutToken = (endpoint, data, method = 'GET') => {
 // const url = `http://localhost:8080/api/statistic/${endpoint}`;
  const url =  `https://statistic-server.herokuapp.com/api/statistic/${endpoint}`;
 if (method === 'GET') {
    return 'Get';
  } else {
    const options = {
      method,
      url: url,
      headers: {
        'Content-type': 'application/json',
      },
      data: JSON.stringify(data),
    };
    return axios.request(options);
  }
};

const fetchDataWithToken = (endpoint, data, method = 'GET', body) => {
  //const url = `http://localhost:8080/api/statistic${endpoint}`

  const url = `https://statistic-server.herokuapp.com/api/statistic${endpoint}`;

  if (method === 'GET') {
    const options = {
      method,
      url: url,
      headers: {
        token: data,
      },
    };
    return axios.request(options);
  } else {
    const options = {
      method,
      url: url,
      headers: {
        'Content-type': 'application/json',
        token: data,
      },
      data: JSON.stringify(body),
    };
    return axios.request(options);
  }
};

export { fecthDataWithoutToken, fetchDataWithToken };
