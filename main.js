// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

let splash = null
function createWindow () {
  // Create the browser window.
  let mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences : {
      nodeIntegration : true,
      devTools : false
    }
    // webPreferences: {
    //   preload: path.join(__dirname, 'preload.js')
    // }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  mainWindow.maximize()

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

function createSplashScreen() {
  splash = new BrowserWindow({
    width : 500,
    height : 400,
    frame : false,
    transparent: true,
  })

  splash.loadFile('splash.html')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  setTimeout(createSplashScreen, 1000)

  setTimeout(() => {
    //splash.close()
    createWindow()
    splash.close()
  }, 10000)
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
