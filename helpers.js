'use strict';

module.exports.defaults = (params) => {
  let response = {}
  if(typeof params === 'undefined') {
    response.error = true;
  }
  let path = params.path || 'https://api.xbuffer.net';
  let user = params.user || '';
  let project = params.project || '';
  let appid = params.appid || '';
  let storage = {}
  if(params.storage && params.storage.type) { storage.type = params.storage.type } else { storage.type = 'session' }
  if(params.storage && params.storage.token) { storage.token = params.storage.token } else { storage.token = 'XbToken' }
  if(params.storage && params.storage.refresh) { storage.refresh = params.storage.refresh } else { storage.refresh = 'XbRefresh' }
  if(params.storage && params.storage.user) { storage.user = params.storage.user } else { storage.user = 'XbUser' }
  if(params.storage && params.storage.email) { storage.email = params.storage.email } else { storage.email = 'XbEmail' }
  if(params.storage && params.storage.logged) { storage.logged = params.storage.logged } else { storage.logged = 'XbLogged' }
  response = {
    path: path,
    user: user,
    project: project,
    appid: appid,
    storage: storage
  }
  if(path && user && project) {
    response.error = false;
  } else {
    response.error = true
  }
  return response;
}

module.exports.json = (json) => {
  let str = json.toString();
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

module.exports.storage = (type) => {
  if(type === 'local') {
    return localStorage;
  } else {
    return sessionStorage;
  }
}
