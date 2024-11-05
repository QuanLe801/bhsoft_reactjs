import { LOCAL_STORAGE_KEY } from 'enums/auth';

export const checkAuth = {
  getAccessToken() {
    return localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  },

  getRefreshToken() {
    return localStorage.getItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
  },

  setAccessToken(token: string) {
    localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, token);
  },

  setRefreshToken(token: string) {
    localStorage.setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, token);
  },

  logout() {
    Object.values(LOCAL_STORAGE_KEY || {}).forEach(key =>
      localStorage.removeItem(key),
    );

    return (window.location.href = '/login');
  },
};
