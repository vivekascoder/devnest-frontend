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

var todos = [
  {text: 'Learning VueJs.', isCompleted: true},
  {text: 'Doing THA.', isCompleted: false}
]

function generateTodo(todo) { 
  return `
    <div 
      class="bg-gray-200 rounded-sm relative ${todo.isCompleted ? 'bg-purple-500 text-white line-through' : ''}"
      onclick="changeStatus({text: '${todo.text}', isCompleted: ${todo.isCompleted}})"
    >
      <p class="p-4">${todo.text}</p>
      <svg xmlns="http://www.w3.org/2000/svg" onclick="deleteTodo({text: '${todo.text}', isCompleted: ${todo.isCompleted}})" class="box-content h-6 w-6 absolute right-0 top-1/2 transform -translate-y-1/2 mr-4 cursor-pointer p-2 rounded-full hover:bg-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </div>
  `
}

function renderTodos() {
  $('#todos').innerHTML = ""
  todos.forEach((t) => {
    $('#todos').innerHTML += generateTodo(t)
  })
}

function setTodos(callback) {
  callback()
  renderTodos()
}
renderTodos()

$('#add-btn').onclick = () => {
  // Adding new Todo.
  let text = $('#todo-text').value
  if (text) {
    setTodos(() => {
      todos.push({
        text: text,
        isCompleted: false
      })
    })
    $('#todo-text').value = ''
  }
}
function deleteTodo(todo) {
  setTodos(() => {
    const t = todos.find(t => t.text == todo.text && t.isCompleted == todo.isCompleted)
    todos.pop(t)
  })
}

function changeStatus(todo) {
  setTodos(() => {
    const t = todos.find(t => t.text == todo.text && t.isCompleted == todo.isCompleted)
    t.isCompleted = !t.isCompleted
  })
}

// // IndexDB
// const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

// if (!indexedDB) {
//   console.log('HAHA, your browser is a joke :(')
// }

// var request = indexedDB.open('tha-todos', 2)

// request.onupgradeneeded = (event) => {
//   var db = event.target.result
// }