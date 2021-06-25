# IndexDB
- https://javascript.info/indexeddb

## Setup 
```js
const dbName = 'tha-todos'
let openRequest = indexedDB.open(dbName, 3)

openRequest.onsuccess = () => {
  let db = openRequest.result
}
```

Object stores are different tables (sort of) of key-value pair database.
Checking if a ObjectStore exists, if not create one.
```js
let openRequest = indexedDB.open("db", 2);

// create/upgrade the database without version checks
openRequest.onupgradeneeded = function() {
  let db = openRequest.result;
  if (!db.objectStoreNames.contains('books')) { // if there's no "books" store
    db.createObjectStore('books', {keyPath: 'id'}); // create it
  }
};
```