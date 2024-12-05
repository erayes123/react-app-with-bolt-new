import axios from 'axios';
import { getSession, removeSession } from './session';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config.url?.includes('login')) {
      await removeSession();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;