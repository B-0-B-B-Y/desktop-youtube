const { ipcRenderer } = require('electron');
var backButton = document.getElementsByClassName('button-back')[0];
var forwardButton = document.getElementsByClassName('button-forward')[0];
var hideButton = document.getElementsByClassName('button-hide')[0];
var closeButton = document.getElementsByClassName('button-close')[0];
const webview = document.querySelector('webview')


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

setupHideButton(hideButton)
setupCloseButton(closeButton)

backButton.addEventListener('click', function () {
  webview.goBack()
})

forwardButton.addEventListener('click', function () {
  webview.goForward()
})

webview.addEventListener('dom-ready', function() {
    webview.insertCSS("body::-webkit-scrollbar { width: 0 !important; }");
});

webview.addEventListener('enter-html-full-screen', function () {
  document.getElementById("menu").style.display = "none"
  document.getElementById("player").style.height = "100%"
  document.getElementById("player").style.width = "100%"
  document.getElementById("player").style.position = "absolute"
})

webview.addEventListener('leave-html-full-screen', function () {
  document.getElementById("menu").style.display = "flex"
  document.getElementById("player").height = "calc(100% - 60px)"
  document.getElementById("player").width = "100%"
  document.getElementById("player").style.position = "relative"
})

document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      webview.executeJavaScript("document.getElementsByClassName('ytp-fullscreen-button')[0].click()")
    }
};
