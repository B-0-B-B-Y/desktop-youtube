const electron = require('electron')
const {app, BrowserWindow, ipcMain} = require('electron')
const { blockWindowAds, adBlocker } = require('electron-ad-blocker')
const path = require('path')
const url = require('url')
const fs = require('fs')

let youtubeWindow = null;

app.on('ready', function() {

  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

    youtubeWindow = new BrowserWindow({
        //height: 630,
        //width: 1150,
        height: height * 0.50,
        width: width * 0.45,
        frame: false,
        transparent: false,
        //x: 1400,
        //y: 760,
        x: width * 0.6,
        y: height * 0.5,
        icon: path.join(__dirname, 'build/icon.png'),
        alwaysOnTop: true
    })

    youtubeWindow.loadURL('file://' + __dirname + '/app/index.html');

    const options = {
      verbose: false,
      logger: console,
    }

    blockWindowAds(youtubeWindow, options);


})

if (process.platform === 'linux') {
    app.commandLine.appendSwitch('enable-transparent-visuals');
    app.commandLine.appendSwitch('disable-gpu');
}

ipcMain.on('button-press-hide', (event, arg) => {
  youtubeWindow.minimize()
})

ipcMain.on('button-press-close', (event, arg) => {
  app.quit()
})
