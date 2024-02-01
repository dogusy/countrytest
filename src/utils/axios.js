const axios = require('axios');
const config = require('../config/config');

const instance = axios.create({
  baseURL: process.env.NODE_APP_URL+":"+config.port,
  withCredentials: true,
});

module.exports = instance;

