'use strict';

// Helpers
const helpers = require('./helpers.js');

// Using axios as an http request handler
const axios = require('axios');

// Constructs needed
// Your base account path
axios.defaults.baseURL = 'https://api.xbuffer.net/v1/client/';
if (this.config.path) axios.defaults.baseURL += this.config.path;
if (this.config.request) axios.defaults.baseURL += this.config.request;

/**
* This is the refresh token interceptor in case your JWT is expired
*/
axios.interceptors.response.use(response => {
  return response;
}, error => {
  var message = {}
  if (helpers.json(error.response.data.message)) {
    message = JSON.parse(error.response.data.message);
  } else {
    message = error.response.data.message;
  }
  const originalRequest = error.config;
  var response = {}
  /**
  * This is haneling expired refresh token
  */
  if (error.response.status === 401 && message.code !== 'MSAAUT3037') {
    /**
    * Redirect your client to login page here
    */
    return Promise.reject(error);
  }
  if (error.response.status === 401 && message.code === 'MSAAUT3037') {
    // originalRequest._retry = true;
    return axios.post('refresh', null, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${helpers.storage.getItem(this.config.refresh)}`
      }
    }).then(result => {
      if (helpers.json(result.data.data)) {
        response = JSON.parse(result.data.data);
      } else {
        response = result.data.data;
      }
      // Store the new retrieved token
      sessionStorage.setItem('XbToken', response.token);
      originalRequest.headers['Authorization'] = `Bearer ${response.token}`;
      return axios(originalRequest);
    }).catch(error => {
      return Promise.reject(error);
    })
  }
  return Promise.reject(error);
});

module.exports.config = {
  path: null,
  request: null,
  method: 'get',
  storage: 'session',
  token: 'XbToken',
  refresh: 'XbRefresh',
  user: 'XbUser'
}

module.exports.xbuffer = () => {
  let path = params.path || '';
  let method = params.method || 'get';
  let headers = {
    'Content-Type': 'application/json'
  }
  if (params.headers) {
    headers['Authorization'] = `Bearer ${helpers.storage.getItem(this.config.token)}`;
  }
  let sendRequest = {
    headers: headers,
    url: path,
    method: method
  }
  if (method === 'get' || method === 'delete') {
    sendRequest.params = params.data;
  } else {
    sendRequest.data = params.data;
  }
  return new Promise((resolve, reject) => {
    axios(sendRequest)
    .then(result => {
      let response = {}
      if (result.data) {
        response = {
          result: true
        }
        if (typeof result.data.data === 'string') {
          if (isJson(result.data.data)) {
            response.data = JSON.parse(result.data.data);
          } else {
            response.data = result.data.data;
          }
        } else if (typeof result.data.data === 'object') {
          response.data = result.data.data;
        }
      } else {
        response = {
          result: false,
          data: null
        }
      }
      resolve(response);
    })
    .catch(error => {
      let response = {}
      if (error.response) {
        response = {
          result: false
        }
        if (typeof error.response.data.message === 'string') {
          if (isJson(error.response.data.message)) {
            response.data = JSON.parse(error.response.data.message);
          } else {
            response.data = error.response.data.message;
          }
        } else if (typeof error.response.data.message === 'object') {
          response.data = error.response.data.message;
        }
      } else if (error.request) {
        response = {
          result: false,
          data: 'Connection Error!'
        }
      }
      reject(response);
    });
  });
}
