# Devnest Frontend


## DSS (Damm Simple State)
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

function renderDOM() {
  // render to the DOM...
}

function setState(callback) {
  callback()
  renderDOM()
}
renderDOM()
```

### How to modify State ?
```js
setState(() => {
  // modify state.todos here...
})
```
