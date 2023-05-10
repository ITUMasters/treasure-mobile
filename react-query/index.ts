import { QueryClient } from '@tanstack/react-query';
import Axios from 'axios';
import { getItem } from '../utils/storage';

export const authorizedQueryClient = new QueryClient();
export const unauthorizedQueryClient = new QueryClient();

const baseURL = 'http://itumasters.com:8000';

export const axios = Axios.create({
  baseURL,
});

axios.interceptors.request.use(
  async function (config) {
    //TODO: Burada bir sorun cikabilir!
    const access_token = await getItem('access_token');
    config.headers['Authorization'] = `Bearer ${access_token}`;
    //config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

