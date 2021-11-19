import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://decemberbank.inhouse.decemberlabs.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  (response) => {
    return { status: 'OK', result: response.data };
  },
  (error) => {
    return Promise.reject(error.response);
  },
);

export default axiosClient;
