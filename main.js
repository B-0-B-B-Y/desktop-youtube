const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')

let youtubeWindow = null;
let controlWindow = null;

app.on('ready', function() {

    youtubeWindow = new BrowserWindow({
        height: 630,
        width: 1040,
        frame: false,
        transparent: false,
        x: 1500,
        y: 800,
    });

    youtubeWindow.loadURL('https://www.youtube.com');
    youtubeWindow.webContents.on('did-finish-load', function() {
      fs.readFile(__dirname+ '/app/css/index.css', "utf-8", function(error, data) {
        if(!error){
            var formatedData = data.replace(/\s{2,10}/g, ' ').trim()
            youtubeWindow.webContents.insertCSS(formatedData)
        }
      })
    })

    youtubeWindow.once('ready-to-show', () => {
      youtubeWindow.show()
    })


    controlWindow = new BrowserWindow({
        parent: youtubeWindow,
        height: 64,
        width: 1040,
        frame: false,
        transparent: true,
        x: 1500,
        y: 740
    });

    controlWindow.loadURL('file://' + __dirname + '/app/index.html');


});

if (process.platform === 'linux') {
    app.commandLine.appendSwitch('enable-transparent-visuals');
    app.commandLine.appendSwitch('disable-gpu');
}
