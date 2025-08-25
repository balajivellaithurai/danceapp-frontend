import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  console.log('API Client - Request to:', config.url);
  console.log('API Client - Token:', token ? 'Present' : 'Missing');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('API Client - Authorization header set');
  }
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Client - Response error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default apiClient;
