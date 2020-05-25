'use strict';

// Helpers
const helpers = require('./helpers.js');

// Using axios as an http request handler
const axios = require('axios');

// Make sure global config variable is set
const xb = window.xbuffer;
const defaults = helpers.defaults(xb);

// Constructs needed
// Your base account path
axios.defaults.baseURL = `${defaults.path}/v1/client/${defaults.user}/${defaults.project}`;
let storage = helpers.storage(defaults.storage.type);

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
  if (error.response.status === 401 && message.code !== 'MSCIND3037') {
    /**
    * Redirect your client to login page here
    */
    return Promise.reject(error);
  }
  if (error.response.status === 401 && message.code === 'MSCIND3037') {
    // originalRequest._retry = true;
    const backData = originalRequest.data instanceof FormData ?  { appid: originalRequest.data.get('appid') } : originalRequest.data ? originalRequest.data : originalRequest.params;
    const head = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${storage.getItem(defaults.storage.refresh)}`
    }
    return axios.post('refresh', backData, {
      headers: head
    }).then(result => {
      if (helpers.json(result.data.data)) {
        response = JSON.parse(result.data.data);
      } else {
        response = result.data.data;
      }
      // Store the new retrieved token
      storage.setItem('XbToken', response.token);
      originalRequest.headers['Authorization'] = `Bearer ${response.token}`;
      return axios(originalRequest);
    }).catch(error => {
      return Promise.reject(error);
    })
  }
  return Promise.reject(error);
});

module.exports.connect = (params, callback) => {
  let response = {}
  // If not alll required params available
  // Desmiss with error
  if(defaults.error) {
    response = {
      result: false,
      data: 'Missing Config Data!'
    }
    return callback(response);
  }

  let path = params.path || '';
  let method = params.method || 'get';
  let headers = {
    'Content-Type': 'application/json'
  }
  if (params.headers) {
    headers['Authorization'] = `Bearer ${storage.getItem(defaults.storage.token)}`;
  }
  if (params.captcha) {
    headers['x-xbuffer-recaptcha'] = params.captcha;
  }
  if (params.type) {
    headers['Content-Type'] = params.type;
  }
  let sendRequest = {
    headers: headers,
    url: path,
    method: method
  }
  if (method === 'get') {
    sendRequest.params = params.data;
    sendRequest.params.appid = defaults.appid;
  } else {
    sendRequest.data = params.data;
    if(params.type === 'multipart/form-data') {
      sendRequest.data.append('appid', defaults.appid)
    } else {
      sendRequest.data.appid = defaults.appid;
    }
  }
  axios(sendRequest)
  .then(result => {
    if (result.data) {
      response = {
        result: true
      }
      if (typeof result.data.data === 'string') {
        if (helpers.json(result.data.data)) {
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
    return callback(response);
  })
  .catch(error => {
    let response = {}
    if (error.response) {
      response = {
        result: false
      }
      if (typeof error.response.data.message === 'string') {
        if (helpers.json(error.response.data.message)) {
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
    return callback(response);
  });
}

module.exports.media = (file, size) => {
  size = `&size=${size}` || ''
  if (file) {
    return `${defaults.path}/v1/client/${defaults.user}/${defaults.project}/?appid=${defaults.appid}&type=media${size}&request=${file}`;
  } else {
    return 'https://via.placeholder.com/368x368?text=No+Image+Was+Found';
  }
}
