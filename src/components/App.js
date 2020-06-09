import React, { useLayoutEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import '../assets/css/index.css'
import '../helpers/buttons'

const App = () => {
  const [siteName, setSiteName] = useState('https://www.youtube.com')
  const [isCasting, setIsCasting] = useState(false)
  const [webview, setWebview] = useState(null)

  useLayoutEffect(() => {
    setWebview(document.querySelector('webview'))
  }, [])

  useLayoutEffect(() => {
    if (webview) {
      const insertCSS = () => {
        webview.insertCSS('body::-webkit-scrollbar { width: 0 !important }')
      }

      webview.addEventListener('dom-ready', insertCSS)

      return () => {
        webview.removeEventListener('dom-ready', insertCSS)
      }
    }
  }, [webview])

  useLayoutEffect(() => {
    if (isCasting) {
      document.querySelector('#player').style.height = 'calc(100%)'
      ipcRenderer.send('tv-mode-on', 'Go into TV mode')
    } else {
      ipcRenderer.send('tv-mode-off', 'Turn off TV mode')
    }
  }, [isCasting])

  const handleBackClick = () => {
    webview.goBack()
  }

  const handleForwardClick = () => {
    webview.goForward()
  }

  const handleCastClick = () => {
    let url = 'https://www.youtube.com/tv'

    if (siteName.includes(url)) {
      url = 'https://www.youtube.com/'

      webview.loadURL(url)
      webview.clearHistory()
      setSiteName(url)
      setIsCasting(false)
    } else {
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
