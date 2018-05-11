const electron = require('electron');
const path = require('path');
const url = require('url');

const {
  app,
  BrowserWindow
} = electron;
require('electron-debug')({
  showDevTools: false
});
let mainWindow;

app.on('ready', function() {
  mainWindow = new BrowserWindow({});
  mainWindow.setMenu(null);
  mainWindow.maximize();
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }));
});