import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

const BASE_URL = `https://${import.meta.env.VITE_SERVER}/api`;
const REFRESH_TOKEN_KEY = 'refreshToken';
const ACCESS_TOKEN_KEY = 'accessToken';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (error.response) {
        if (error.response.status === 401 && !originalRequest._retry) {
        if (error.response.data.code === 'invalid_refresh_token') {
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
            return Promise.reject(error);
        }

        if (!isRefreshing) {
            isRefreshing = true;
            const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

            if (refreshToken) {
            return refreshTokenCall(refreshToken).then((newToken) => {
                localStorage.setItem(ACCESS_TOKEN_KEY, newToken);
                axiosInstance.defaults.headers.Authorization = `Bearer ${newToken}`;
                refreshTokenSubject.next(newToken);
                isRefreshing = false;

                return axiosInstance(originalRequest);
            }).catch((err) => {
                localStorage.removeItem(ACCESS_TOKEN_KEY);
                localStorage.removeItem(REFRESH_TOKEN_KEY);
                isRefreshing = false;
                return Promise.reject(err);
            });
            } else {
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
            return Promise.reject(error);
            }
        } else {
            return refreshTokenSubject.pipe(
            filter(token => token !== null),
            switchMap(token => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axiosInstance(originalRequest);
            })
            ).toPromise();
        }
        }
    }
    return Promise.reject(error);
  }
);

const refreshTokenCall = async (refreshToken: string): Promise<string> => {
    const response = await axiosInstance.post('/auth/refresh', { "refresh_token": refreshToken });
    return response.data.accessToken;
};

export default axiosInstance;
