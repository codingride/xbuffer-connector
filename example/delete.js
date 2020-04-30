/**
* Delete a document from a collection
*/

var getRequest = {
  path: '',
  method: 'post',
  data: {
    type: 'data',
    request: 'collection_name', // Collection name in the database
    id: 'id01....', // This must to be provided to know what document needs to be deleted
  }
}

/**
* To delete piece of data from an array or an object inside an existing document.
* if the destination is nested inside the document use the "-" between nested keys.
* for example, if the target is an object inside an object, the record field needs to be like this:
* "key_name-child". The child in this case must be an object or an array.
* You can delete a value if it's an array, you can delete a key:value pair if it's an object.
*/
var getRequest = {
  path: '',
  method: 'delete',
  data: {
    type: 'data',
    id: 'id01....', // This must to be provided to know what document needs to be changed
    request: 'collection_name', // Collection name in the database
    record: 'key_name', // Add the targted destnation where you want to delete from.
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
