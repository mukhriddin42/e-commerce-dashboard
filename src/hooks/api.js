const acssesToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImFnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEzNi4wLjAuMCBTYWZhcmkvNTM3LjM2Iiwicm9sZSI6MSwiaWF0IjoxNzQ4NDM0ODkwLCJleHAiOjE3NDg0MzU3OTB9.-yAygChv0EMGOUYq1LpsE9KeY6m5EkwVENQ79yNjubA'

localStorage.setItem('accessToken', acssesToken)

import axios from 'axios';

let isRefreshing = false;
let failedQueue = [];

const api = axios.create({
  baseURL: 'https://api-ojta.onrender.com/api',
  timeout: 5000,
});


api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);



api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: token => {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              resolve(api(originalRequest));
            },
            reject: err => reject(err),
          });
        });
      }

      isRefreshing = true;


    }

    return Promise.reject(error);
  }
);

export default api;
