// WIP - Add insertCSS and other event listener functions here and import them into App.js

webview.addEventListener('enter-html-full-screen', function () {
  document.getElementById('menu').style.display = 'none'
  document.getElementById('player').style.height = '100%'
  document.getElementById('player').style.width = '100%'
  document.getElementById('player').style.position = 'absolute'
})

webview.addEventListener('leave-html-full-screen', function () {
  document.getElementById('menu').style.display = 'flex'
  document.getElementById('player').style.height = 'calc(100% - 60px)'
  document.getElementById('player').style.width = '100%'
  document.getElementById('player').style.position = 'relative'
})
