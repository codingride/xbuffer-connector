/**
* Add a new document to a collection
*/

var getRequest = {
  path: '',
  method: 'post',
  type: 'data',
  request: 'collection_name' // Collection name in the database
  data: { "key" : "value" } // This must be a key:value json object
}

/**
* To add an additional piece of data to an array or object in an existing document.
* if the destination is nested inside the document use the "-" between nested keys.
* for example, if the target is an object inside an object, the record field needs to be like this:
* "key_name-child". The child in this case must be an object or an array.
* You can add a string to it if it's an array, you can add a key:value pair if it's an object.
*/
var getRequest = {
  path: '',
  method: 'post',
  type: 'data',
  request: 'collection_name', // Collection name in the database
  record: 'key_name' // Add the targted destnation where you want to add the new data.
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
