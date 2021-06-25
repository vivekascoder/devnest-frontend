// Implementing the IndexDB
const dbName = 'tha-todos'
const todoStoreName = 'todos'
let openRequest = indexedDB.open(dbName, 3)

openRequest.onupgradeneeded = () => {
  let db = openRequest.result
  if (!db.objectStoreNames.contains(todoStoreName)) {
    db.createObjectStore(todoStoreName, {keyPath: 'id'})
  }
}
openRequest.onsuccess = () => {
  let db = openRequest.result
  let transaction = db.transaction(todoStoreName, 'readwrite')
  let todosObjectStore = transaction.objectStore(todoStoreName)
  let todosData = todosObjectStore.getAll()
  todosData.onsuccess = () => {
    setTodos(() => {
      todos = todosData.result
    })
  }
}

function insertTodo(db, todo) {
  // insert into indexdb.
  let tx = db.transaction(todoStoreName, 'readwrite')
  let txObjectStore = tx.objectStore(todoStoreName)
  txObjectStore.add({...todo})
}

function updateTodo(db, todo, id) {
  let tx = db.transaction(todoStoreName, 'readwrite')
  let txObjectStore = tx.objectStore(todoStoreName)
  txObjectStore.
}