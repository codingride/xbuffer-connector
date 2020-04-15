/**
* Query database by collection name
*/

var getRequest = {
  path: '',
  method: 'get',
  type: 'data',
  request: 'collection_name' // Collection name in the database
}

/**
* To get more refined resonse
*/
var getRequest = {
  path: '',
  method: 'get',
  type: 'data',
  request: 'collection_name', // Collection name in the database
  record: 'key_name' // Will get all documents in the collection that has this key
}

/**
* Query collection by id
*/
var getRequest = {
  path: '',
  method: 'get',
  type: 'data',
  request: 'collection_name', // Collection name in the database
  id: 'id1...,id2....' // You can get a single document or multble documents by passing an ID or more seperated by comma 
}

/**
* Query collection by value
*/
var getRequest = {
  path: '',
  method: 'get',
  type: 'data',
  request: 'collection_name', // Collection name in the database
  getby: 'key_one:value,key_two:value' // Will get all documents that has the key with the value assigned. You can pass more key value pares seprated by comma
}

/**
* Then call one of the above requests with xbuffer-connector
*/
Xbuffer.connect(getRequest, result => {
  if(result.result) {
    // Do something amazing .....
  } else {
    // handle error message
  }
});
