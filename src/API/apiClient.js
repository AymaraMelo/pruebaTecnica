import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://decemberbank.inhouse.decemberlabs.com/api/',
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosClient.interceptors.response.use(
    (response) => {
        console.log(response.data);
        return response.data;
    },
    (error) => {
        console.log('errorcito');
        return Promise.reject(error);
    }
);


export default axiosClient;