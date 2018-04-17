const electron = require('electron')
const {app, BrowserWindow, ipcMain} = require('electron')
const { blockWindowAds, adBlocker } = require('electron-ad-blocker')
const {autoUpdater} = require("electron-updater")
const path = require('path')
const url = require('url')
const fs = require('fs')

let youtubeWindow = null;

app.on('ready', function() {

  autoUpdater.checkForUpdatesAndNotify()

  const {width, height} = electron.screen.getPrimaryDisplay().size

    youtubeWindow = new BrowserWindow({
        height: height * 0.50,
        width: width * 0.5,
        frame: false,
        transparent: false,
        icon: path.join(__dirname, 'app/build/icon.png'),
        alwaysOnTop: false,
        show: false
    })

    youtubeWindow.loadURL('file://' + __dirname + '/app/index.html');

    const options = {
      verbose: false,
      logger: console,
    }

    blockWindowAds(youtubeWindow, options);

    youtubeWindow.once('ready-to-show', () => {
      ipcMain.on('can-show', (event, arg) => {
        youtubeWindow.show()
      })
    })


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
