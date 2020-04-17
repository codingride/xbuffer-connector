/**
* Change a value inside a collection
*
* To change a current value inside an existing document.
* if the destination is nested inside the document use the "-" between nested keys.
* for example, if the target is a string, array or an object inside an object, the record field needs to be like this:
* "key_name-child". The child in this case must be a string or an object. 
* If the targer is an array, you need to specify the index key needs to be changed like this:
* "key_name-child-0"
* You can add a string to it if it's an array, you can add a key:value pair if it's an object.
*/
var getRequest = {
  path: '',
  method: 'put',
  type: 'data',
  id: 'id01....', // This must to be provided to know what document needs to be changed
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
