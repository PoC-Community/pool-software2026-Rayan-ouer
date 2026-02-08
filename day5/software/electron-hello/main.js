const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('node:path');


function createMenu() {
    const template = [];

    template.push({
    label: 'File',
    submenu: [
            { role: 'new'},
            { role: 'open'},
            { role: 'quit'},
            { copy: 'copy'},
            { role: 'paste'}
        ]
    });

    template.push({
        label: 'Edit',
        submenu: [
            { role: 'undo'},
            { role: 'redo'},
            { role: 'cut'},
            { role: 'copy'},
            { role: 'paste'}
        ]
    });

    template.push({
        label: 'Help',
        submenu: [
            {
                label: 'About',
                click() {
                    dialog.showMessageBox()
                }
            }
        ]
    })

    template.push({
        role: 'window',
        submenu: [{ role: 'minimize'}, { role: 'close'}]
    })

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });
    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
    createMenu();
});

app.on('window-all-closed', () => {
    app.quit()
})

ipcMain.handle('send-message', async (event, msg) => {
    msg = "test";
    console.log('Message:', msg);
    return `${msg}`;
});

ipcMain.handle('get-version', async (event) => {
    return app.getVersion();
});

ipcMain.handle('on-message', async () => {
    return app.onMessage()
})
