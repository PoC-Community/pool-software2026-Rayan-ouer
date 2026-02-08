const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
    'electronAPI',
    {
        sendMessage: (message) => ipcRenderer.invoke('send-message', message),
        onMessage: (callback) => ipcRenderer.on('message-from-main', (e, message) => {
            callback(message)
        }),
        getVersion: () => ipcRenderer.invoke('get-version')
    }
)