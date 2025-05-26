import axios from 'axios';
// const APP_URL = process.env.REACT_APP_URL ||  'http://localhost:8000/';
const APP_URL =  'https://schoolnode-1.onrender.com/';
function getToken() {
  return localStorage.getItem('AdminToken');
}

// Create an Axios instance
let Api = axios.create({
  baseURL: APP_URL,
  headers: {
    'Accept': 'application/json',
    "Access-Control-Allow-Origin": "*",
  }
});

// Set up an interceptor to add the Authorization token to each request
Api.interceptors.request.use(
  async (config) => {
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

export default Api;
