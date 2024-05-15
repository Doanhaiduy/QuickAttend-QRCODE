import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
    config.headers = {
        Authorization: '',
        Accept: 'application/json',
        ...config.headers,
    };
    config.data;
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response.status === 200 && response.data && response.data.status === 'success') {
            return response.data;
        }
        throw new Error('Something went wrong');
    },
    (error) => {
        throw error.response.data.message || error.message;
    }
);

export default axiosClient;
