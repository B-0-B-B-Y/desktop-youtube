const { app, BrowserWindow, ipcMain, session, screen } = require('electron')
const { ElectronBlocker, fullLists } = require('@cliqz/adblocker-electron')
const fetch = require('node-fetch')
const { autoUpdater } = require('electron-updater')
const fs = require('fs').promises
const path = require('path')

let youtubeWindow = null

const createWindow = async () => {
  autoUpdater.checkForUpdatesAndNotify()

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

  youtubeWindow.loadURL('file://' + __dirname + '/src/index.html')

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
