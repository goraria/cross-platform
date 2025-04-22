// const { app, BrowserWindow } = require('electron')
import { app, BrowserWindow } from 'electron'

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 720 // 800
    })

    win.loadFile('views/index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// app.whenReady().then(() => {
//     createWindow()
// })

// app.on('ready', () => {
//     createWindow()
// })

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') app.quit()
// })

// app.whenReady().then(() => {
//     createWindow()
//
//     app.on('activate', () => {
//         if (BrowserWindow.getAllWindows().length === 0) createWindow()
//     })
// })