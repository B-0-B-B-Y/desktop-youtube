import React, { useLayoutEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import '../assets/css/index.css'
import '../helpers/buttons'
import { insertCSS, handleEnterFullscreen, handleLeaveFullscreen } from '../helpers/functions'

const App = () => {
  const [siteName, setSiteName] = useState('https://www.youtube.com')
  const [isCasting, setIsCasting] = useState(false)
  const [webview, setWebview] = useState(null)
  const [menu, setMenu] = useState(null)
  const [player, setPlayer] = useState(null)

  useLayoutEffect(() => {
    setWebview(document.querySelector('webview'))
    setMenu(document.querySelector('#menu'))
    setPlayer(document.querySelector('#player'))
  }, [])

  useLayoutEffect(() => {
    if (webview) {
      webview.addEventListener('dom-ready', insertCSS.bind(this, webview))

      return () => {
        webview.removeEventListener('dom-ready', insertCSS)
      }
    }
  }, [webview])

  useLayoutEffect(() => {
    if (isCasting && player) {
      player.style.height = '100%'
      ipcRenderer.send('tv-mode-on', 'Go into TV mode')
    } else if (player) {
      player.style.height = 'calc(100% - 60px)'
      ipcRenderer.send('tv-mode-off', 'Turn off TV mode')
    }
  }, [isCasting, player])

  useLayoutEffect(() => {
    if (menu && player) {
      webview.addEventListener('enter-html-full-screen', handleEnterFullscreen.bind(this, menu, player))
      webview.addEventListener('leave-html-full-screen', handleLeaveFullscreen.bind(this, menu, player))

      return () => {
        webview.removeEventListener('enter-html-full-screen', handleEnterFullscreen)
        webview.removeEventListener('leave-html-full-screen', handleLeaveFullscreen)
      }
    }
  }, [menu, player])

  const handleBackClick = () => {
    webview.goBack()
  }

  const handleForwardClick = () => {
    webview.goForward()
  }

  const handleCastClick = () => {
    let url = 'https://www.youtube.com/tv'

    if (siteName.includes(url)) {
      url = 'https://www.youtube.com'

      menu.style.display = 'flex'
      webview.loadURL(url)
      webview.clearHistory()
      setSiteName(url)
      setIsCasting(false)
    } else {
      menu.style.display = 'none'
      webview.loadURL(url)
      webview.clearHistory()
      setSiteName(url)
      setIsCasting(true)
    }
  }

  const handleHideClick = () => {
    ipcRenderer.send('button-press-hide', 'Hide the app')
  }

  const handleCloseClick = () => {
    ipcRenderer.send('button-press-close', 'Close the app')
  }

  return (
    <>
      <div className='menu-bar' id='menu'>
        <div className='buttons'>
            <img
              className='button-back'
              draggable='false'
              src='assets/img/back.png'
              onClick={handleBackClick}
            />
            <img
              className='button-forward'
              draggable='false'
              src='assets/img/forward.png'
              onClick={handleForwardClick}
            />
            <div className='right'>
              <img
                className='button-cast'
                draggable='false'
                src='assets/img/cast.png'
                onClick={handleCastClick}
              />
              <img
                className='button-hide'
                draggable='false'
                src='assets/img/hide.png'
                onClick={handleHideClick}
              />
              <img
                className='button-close'
                draggable='false'
                src='assets/img/close.png'
                onClick={handleCloseClick}
              />
            </div>
        </div>
      </div>

      <div id='player'>
        <webview id='webview' src='https://www.youtube.com'></webview>
      </div>
    </>
  )
}

export default App
