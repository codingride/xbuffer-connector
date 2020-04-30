/**
* Query database by collection name
*/

var getRequest = {
  path: '',
  method: 'get',
  data: {
    type: 'data',
    request: 'collection_name' // Collection name in the database
  }
}

/**
* To get more refined resonse
*/
var getRequest = {
  path: '',
  method: 'get',
  data: {
    type: 'data',
    request: 'collection_name', // Collection name in the database
    record: 'key_name' // Will get all documents in the collection that has this key
  }
}

/**
* Query collection by id
*/
var getRequest = {
  path: '',
  method: 'get',
  data: {
    type: 'data',
    request: 'collection_name', // Collection name in the database
    id: 'id1...,id2....' // You can get a single document or multble documents by passing an ID or more seperated by comma 
  }
}

/**
* Query collection by value
*/
var getRequest = {
  path: '',
  method: 'get',
  data: {
    type: 'data',
    request: 'collection_name', // Collection name in the database
    getby: 'key_one:value,key_two:value' // Will get all documents that has the key with the value assigned. You can pass more key value pares seprated by comma
  }
}

/**
* Query collection with pagination like
* This goes for all previous examples except querying by IDs.
*/
var getRequest = {
  path: '',
  method: 'get',
  data: {
    type: 'data',
    request: 'collection_name', // Collection name in the database
    offset: 0, // This is to set where to begin requesting documents. It begins with 0 then 10 if you want to show only 10 per request.
    max: 100// This can be up to 100 document per request. This is going to be changed to "limit" instead of "max" in the next version
    // Each data get request will give out the total size documents that matches your query so you can easily build your pagination. The response key will be "count"
  }
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
