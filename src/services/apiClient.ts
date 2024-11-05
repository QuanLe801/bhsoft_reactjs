import { checkAuth } from 'services/auth/checkAuth';
import axios from 'axios';

//This file need to replaces middleware. In order to config the axios => make it check auth before doing something
//If an user existing ( logged ) => accept request => if not , redirect to login page
const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_MOCK_API}`,
  // timeout: 5000,
});

axiosInstance.interceptors.request.use(config => {
  const token = checkAuth.getAccessToken();

  if (!token) {
    checkAuth.logout();
    window.location.href = '/login';
    return Promise.reject('No token found');
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
