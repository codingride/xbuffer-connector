'use strict';

module.exports.json = (json) => {
  var str = json.toString();
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
