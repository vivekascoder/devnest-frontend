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
  files: []
}

function renderDOM() {
  $('#folder').innerHTML = ''
  $('#folder').innerHTML = generateAllFilesDOM(state.files)
}

function generateAllFilesDOM(files, mr=0) {
  // generate the DOM from the state.files
  let dom = ''
  files.forEach((file) => {
    let isFolder = file.type == 'blob' ? false : true
    dom += generateFile(file.path, folder=isFolder, mr, file.sha)
    if (Object.keys(file).includes('files')) {
      let a = mr;
      dom += generateAllFilesDOM(file.files, ++a)
    }
  })
  return dom
}
function getRelatedItem(files, shaId) {
  for (let file of files){
    console.log(file.sha, file.sha === shaId)
    if (file.sha === shaId) {
      return file
    }
    if (Object.keys(file).includes('files')) {
      console.log('loop')
      let found = getRelatedItem(file.files, shaId)
      if (found) return found 
    }
  }
}

function generateFile(name, folder=false, mr=0, shaId) {
  if (!folder) {
    return `
      <div class="flex space-x-2 items-center" style="margin-left: ${mr}rem" id="${shaId}">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span class="text-sm">${name}</span>
      </div>
      `
  } else {
    return `
      <div class="folder-item flex space-x-2 items-center" style="margin-left: ${mr}rem" id="${shaId}" onclick="fetchRelatedContent('${shaId}')">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
        <span class="text-sm">${name}</span>
      </div>
      `
  }
}
$('#fetch').onclick = (e) => {
  e.preventDefault();
  var username = $('#username').value
  var repo = $('#repo').value
  console.log('clicking...');

  fetch(`https://api.github.com/repos/${username}/${repo}/git/trees/master`)
    .then((response) => response.json())
    .then((data) => {
      setState(() => {
        state.files = data.tree
      })
      console.log(state.files);
    })
}

function fetchRelatedContent(shaId) {
  var item = getRelatedItem(state.files, shaId)
  if (!Object.keys(item).includes('files')){
    fetch(item.url)
    .then((response) => response.json())
    .then((data) => {
      setState(() => {
        item['files'] = data.tree
      })
    })
  }
}


function setState(callback) {
  callback()
  renderDOM()
}
renderDOM()