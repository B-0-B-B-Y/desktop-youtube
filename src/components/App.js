import React from 'react'
import '../assets/css/index.css'

// import backButton from '../assets/img/back.png'

const App = () => {

  // console.log(backButton)

  return (
    <>
      <div className="menu-bar" id="menu">
        <div className="buttons">
            <img className="button-back" draggable="false" src='/assets/img/back.png' />
            <img className="button-forward" draggable="false" src="assets/img/forward.png" />
            <div className="right">
              <img className="button-cast" draggable="false" src="assets/img/buttons/cast.png" />
              <img className="button-hide" draggable="false" src="assets/img/buttons/hide.png" />
              <img className="button-close" draggable="false" src="assets/img/buttons/close.png" />
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
