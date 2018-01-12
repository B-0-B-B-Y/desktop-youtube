const { ipcRenderer } = require('electron');
var backButton = document.getElementsByClassName('button-back')[0];
var forwardButton = document.getElementsByClassName('button-forward')[0];
var hideButton = document.getElementsByClassName('button-hide')[0];
var closeButton = document.getElementsByClassName('button-close')[0];

function setupBackButton(b) {
  b.addEventListener('click', function () {
    ipcRenderer.send('button-press-back', 'Go back to previous page')
  })
}

function setupForwardButton(b) {
  b.addEventListener('click', function () {
    ipcRenderer.send('button-press-forward', 'Go forward to most recent page')
  })
}

function setupHideButton(b) {
  b.addEventListener('click', function () {
    ipcRenderer.send('button-press-hide', 'Hide the app')
  })
}

function setupCloseButton(b) {
  b.addEventListener('click', function () {
    ipcRenderer.send('button-press-close', 'Close the app')
  })
}

setupBackButton(backButton)
setupForwardButton(forwardButton)
setupHideButton(hideButton)
setupCloseButton(closeButton)
