# xbuffer-connector
Connecting to Xbuffer API services

## Installation
```ssh
npm i xbuffer-connector
```

## Required Pre Settings
Create a global variable of type object that can be accessed from anywhere in your application.
The var name must be named "xbuffer".
For example, if you're using VueJS or ReactJS, you need to assign the global variable in the "index.html" file inside the project's "public" folder.
```JavaScript
var window.xbuffer = {
  path: 'https://api.xbuffer.net', // This is the default value. You can change the path name if you are given a different one.
  user: '...', // Your user account name that appears inside your account
  project: 'website', // Your project name that you've created inside your account
  appid: 'bb42a....5ea8:web', // The application ID that is created when you create a project. Change this value whenever you reset it.
  storage: { // This is optional if you don't want to change the defaults but it's required when you set your own.
    type: 'session',
    token: 'XbToken',
    refresh: 'XbRefresh',
    user: 'XbUser',
    email: 'XbEmail',
    logged: 'XbLogged'
  }
}
```

## Usage
This is a very basic GET request example. More examples are going to be added in the documentation page.
```JavaScript
import Xbuffer from 'xbuffer-connector'

var paramsToPass = {
  method: 'get', // Could be 'POST', 'PUT', or 'DELETE' based on the type of the request
  headers: false, // This must be 'true' if the request requires authentication
  data: {
    type: 'data', // This can be 'media' when you request an image or a file or 'data' if you want to query the database
    request: 'collection', // This is the database collection or table you want to query
    getby: 'type:article', // Example of different params you can use querying your database
    offset: this.offset, // More examples will be added to the documentation part
    max: this.max
  }
}
Xbuffer.connect(paramsToPass, response => {
  if(response.result) {
    // If you get a valid result, then you can do anything with the data that is sent to you
    // The data is going to be sent as an array: [response.data]
  } else {
    // This means an error has happened
    // The error you get contains an error code and an error message
    // response.data.code
    // response.data.message
  }
});
```

## Example
[Authentication](https://github.com/codingride/xbuffer-connector/blob/master/example/auth.js)
