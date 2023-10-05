const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
    'ipcRenderer',
    {
        onceInitData: (cb) => {
            ipcRenderer.once('init-data', cb);
        }
        ,
        invokeAddNewTask: (newTask, cb) => {
            ipcRenderer.invoke('add-new-task', newTask)
                .then(cb);

        },
        askOpenNewTaskWindow: (type) => {
            console.log("Main display 1 : Entering askOpenNewTaskWindow in preload.js");
            ipcRenderer.send('ask-open-new-task-window', type);
        },
        onNewTaskAdded: (cb) => {
            console.log("Main display 2 : Entering onNewTaskAdded in preload.js");
            ipcRenderer.on('new-task-added',cb);
        },
    }
)

