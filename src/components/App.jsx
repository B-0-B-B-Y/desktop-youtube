import React from 'react'

const App = () => {
  return (
    <>
      <div class="menu-bar" id="menu">
        <div class="buttons">
            <img class="button-back" draggable="false" src="assets/img/buttons/back.png" />
            <img class="button-forward" draggable="false" src="assets/img/buttons/forward.png" />
            <div class="right">
              <img class="button-cast" draggable="false" src="assets/img/buttons/cast.png" />
              <img class="button-hide" draggable="false" src="assets/img/buttons/hide.png" />
              <img class="button-close" draggable="false" src="assets/img/buttons/close.png" />
            </div>
        </div>
      </div>

      <div id="player">
        <webview id="webview" src="https://www.youtube.com"></webview>
      </div>
    </>
  )
}

export default App
