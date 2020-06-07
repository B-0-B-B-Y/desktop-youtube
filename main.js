const electron = require('electron')
const {app, BrowserWindow, ipcMain, session} = require('electron')
const { ElectronBlocker, fullLists } = require('@cliqz/adblocker-electron')
const fetch = require('node-fetch')
const { autoUpdater } = require("electron-updater")
import { promises as fs } from 'fs'
const path = require('path')

let youtubeWindow = null

const createWindow = async () => {
  autoUpdater.checkForUpdatesAndNotify()

  const {width, height} = electron.screen.getPrimaryDisplay().size

  youtubeWindow = new BrowserWindow({
      height: height * 0.50,
      width: width * 0.5,
      frame: false,
      transparent: false,
      icon: path.join(__dirname, 'app/build/icon.png'),
      alwaysOnTop: false,
      show: true,
      webPreferences: {
        webviewTag: true
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

  youtubeWindow.loadURL('file://' + __dirname + '/app/index.html')

  youtubeWindow.once('ready-to-show', () => {
    ipcMain.on('can-show', (event, arg) => {
      youtubeWindow.show()
    })
  })
}

app.allowRendererProcessReuse = false

app.on('ready', createWindow)

app.on('activate', () => {
  if (youtubeWindow === null) {
    createWindow()
  }
})

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
