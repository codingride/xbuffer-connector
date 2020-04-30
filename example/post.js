/**
* Add a new document to a collection
*/

var getRequest = {
  path: '',
  method: 'post',
  headers: true, // Set true if write to database is restricted
  data: {
    { "key" : "value" }, // This must be a key:value json object
    type: 'data',
    request: 'collection_name', // Collection name in the database
  }
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
  headers: true, // Set true if write to database is restricted
  data: {
    type: 'data',
    id: 'id01....', // This must to be provided to know what document needs to be changed
    request: 'collection_name', // Collection name in the database
    record: 'key_name', // Add the targted destnation where you want to add the new data.
    data: "new data" // It could be another object like { "new_key":"new_val" }
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
