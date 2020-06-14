const { app, BrowserWindow, ipcMain, session, screen } = require('electron')
const { ElectronBlocker, fullLists } = require('@cliqz/adblocker-electron')
const fetch = require('node-fetch')
const fs = require('fs').promises
const path = require('path')
const url = require('url')
const userAgent = 'Mozilla/5.0 (SMART-TV; Linux; Tizen 5.0) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/2.2 Chrome/63.0.3239.84 TV Safari/537.36'

let youtubeWindow = null

const createWindow = async () => {
  const {width, height} = screen.getPrimaryDisplay().size

  youtubeWindow = new BrowserWindow({
      height: height * 0.50,
      width: width * 0.5,
      frame: false,
      transparent: false,
      icon: path.join(__dirname, 'src/build/icon.png'),
      alwaysOnTop: false,
      show: true,
      webPreferences: {
        webviewTag: true,
        nodeIntegration: true
      }
  })

  const blocker = await ElectronBlocker.fromLists(fetch, fullLists, {
    enableCompression: true,
  }, {
    path: 'engine.bin',
    read: fs.readFile,
    write: fs.writeFile
  })

  blocker.enableBlockingInSession(session.defaultSession)

  // Necessary to have YouTube cast still work
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = userAgent
    callback({ cancel: false, requestHeaders: details.requestHeaders })
  })

  youtubeWindow.loadURL(url.format({
    protocol: 'http',
    host: 'localhost:8080',
    pathname: 'index.html',
    slashes: true
  }))

  youtubeWindow.once('ready-to-show', () => {
    ipcMain.on('can-show', (event, arg) => {
      youtubeWindow.show()
    })
  })
}

app.allowRendererProcessReuse = false

app.on('ready', createWindow)

ipcMain.on('button-press-hide', (event, arg) => {
  youtubeWindow.minimize()
})

ipcMain.on('button-press-close', (event, arg) => {
  app.quit()
})

ipcMain.on('tv-mode-on', (event, arg) => {
  youtubeWindow.setFullScreen(true)
})

ipcMain.on('tv-mode-off', (event, arg) => {
  youtubeWindow.setFullScreen(false)
})
