const acssesToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImFnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEzNi4wLjAuMCBTYWZhcmkvNTM3LjM2Iiwicm9sZSI6MSwiaWF0IjoxNzQ4NDM4MTEzLCJleHAiOjE3NDg0MzkwMTN9.BWnoUOoWNV560Grn5oySs8QnoIhvQsMJNcLaGvvk5Fo"

localStorage.setItem('accessToken', acssesToken)

import axios from 'axios';

let isRefreshing = false;
let failedQueue = [];

const api = axios.create({
  baseURL: 'https://api-ojta.onrender.com/api',

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
