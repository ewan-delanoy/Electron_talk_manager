const { app, ipcMain, BrowserWindow } = require('electron');
const path = require('path');

let homeWindow;
let taskCreationWindow;

const data = [
    {
        label: 'Apprendre NodeJS',
        description: 'Apprendre les bases de NodeJS & Express',
        status: false
    },
    {
        label: 'Apprendre Electron',
        description: 'Apprendre les bases de la création d\'application Desktop',
        status: false
    }
];

function createWindow(viewName, viewData = null, width = 1400, height = 1000) {
    const win = new BrowserWindow({
        width,
        height,
        webPreferences: {
            // on arrête d'exposer les node_modules côté front
            nodeIntegration: false,
            // on isole tout pour éviter les problèmes
            contextIsolation: true,
            // on arrête d'exposer le module remote d'Electron
            enableRemoteModule: false,
            // on donne à notre vue le fichier preload.js pour qu'elle expose
            // la clé et la méthode loadController
            preload: path.join(__dirname, 'app', 'preload.js')
        }
    });

    win.loadFile(path.join(__dirname, 'src', 'views', viewName, viewName + '.html'))
        .then(() => {
            win.send('init-data', viewData);
        });

    // only in dev mode 
    win.webContents.openDevTools();
    return win;
}


app.whenReady().then(() => {
    homeWindow = createWindow('home', data);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow('home', data);
        }
    })
});

ipcMain.on('ask-open-new-task-window', (e, type) => {
    console.log("Background 1 : Entering ask-open-new-account-window in main.js");
    taskCreationWindow = createWindow('new-task');
    ipcMain.handle('add-new-task', (e,newTask) => {
        console.log("Background 2 : Entering handle add-new-task in main.js");
        console.log("newTask is : ");
        console.log(newTask);
        data.push(newTask);
        // Notifier home
        homeWindow.send('new-task-added', data);

        setTimeout(() => {
            taskCreationWindow.close();
        }, 3000);
        // Renvoie sur addAccountType
        return 'La nouvelle tâche a été prise en compte';

    });
    taskCreationWindow.on('closed', () => {
      console.log("Background 3 : Entering newAccountTypeWindow_on_closed in main.js");
      ipcMain.removeHandler('add-new-task')
    });
});


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})
