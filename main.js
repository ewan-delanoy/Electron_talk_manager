const {app, BrowserWindow} = require('electron');
const path = require('path');


const data = [
    {
        label : 'Apprendre NodeJS',
        description : 'Apprendre les bases de NodeJS & Express',
        status : false
    },
    {
        label : 'Apprendre Electron',
        description : 'Apprendre les bases de la création d\'application Desktop',
        status : false
    }
];

function createWindow(viewName,viewData=null,width =1400,height = 1000) {
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
         win.send('init-data',viewData);
    });

    // only in dev mode 
    win.webContents.openDevTools();
}


app.whenReady().then(() => {
    createWindow('home', data);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow('home', data);
        }
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})
 