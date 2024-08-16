import axios from 'axios';

// Function to get the token from local storage
function getToken() {
  return localStorage.getItem('token'); // Or sessionStorage, depending on where you store it
}

// Set up a request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
