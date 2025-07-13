import axios from 'axios';

const instance = axios.create({
  baseURL: '/api', // Use relative path since frontend and backend are on same origin
  withCredentials: true,
});

export default instance;
