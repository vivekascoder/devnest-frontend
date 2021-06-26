# Todify.

## Feature
- It has a sort of virtual state, (It's quite simple but helps a lot.)

### What's State
`state` variable represents the program's state. 
```js
$ = (el) => {
  const els = document.querySelectorAll(el)
  if (els.length > 1) {
    return els
  }
  else if (els.length == 1) {
    return els[0]
  } else {
    return null
  }
}

state = {
  todos: []
}
```

We use a method setState to change it which in turn updates the DOM.
```js
function setState(callback) {
  callback()
  renderTodos()
}
renderTodos()
```
The method renderTodos, renders the Todos or updates the DOM.


### How will i change the state.
The following code demostrate the use of setState method.
```js
function deleteTodo(id) {
  setState(() => {
    state.todos = state.todos.filter((t) => t.id != id)
  })
}
```

## IndexDB
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