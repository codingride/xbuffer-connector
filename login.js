import Xbuffer from './xbuffer';

/**
* Prepare data to be used in your auth request
*/
let data = {
  data: {
    email: '', // The email that is coming from the login form
    password: '' // The password that is coming from the login form
  },
  path: 'auth',
  method: 'post',
  headears: false // Headers are important for requests after logging in
}

/**
* Using axios imported from xbuffer file
*/
Xbuffer(data, result => {
  if (result.result && result.data.token) {
    /**
    * token, refresh and account (user uuid) returning back after successful login
    * You may store results in sessionStorage or localStorage to be resued for further requests
    */
    sessionStorage.setItem('XbToken', result.data.token);
    sessionStorage.setItem('XbRefresh', result.data.refresh);
    sessionStorage.setItem('XbUser', result.data.account);
    /**
    * Redirect after successful login
    */
  } else {
    /**
    * show error notification
    */
  }
});
