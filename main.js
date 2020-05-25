const { app, BrowserWindow, globalShortcut } = require('electron')

// Criando o objeto config e importando o atributo URL do arquivo config.js
const config = require('./config')

// Disponibilizando o objeto BrowserWindow de maneira global
let win;

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',            // Escondendo a barra de título (notável em MacOS)
    alwaysOnTop: true,                  // Layout fixo
    webPreferences: {
      nodeIntegration: true
    }
  })

  // Passando a URL através do objeto config
  win.loadURL(config.url)                   

}

// Função para abrir o DevTools
function toggleDevTools(){
  win.webContents.toggleDevTools()
}

// Função para criar atalhos, recebe como parâmetros as teclas e a função à ser executada (sem parametros)
function createShortcuts(){
  globalShortcut.register('CommandOrControl+J', toggleDevTools)
}

// Disponibilizar funcionalidades na aplicação, quando o App estiver carregado
app.whenReady()
.then(createWindow)
.then(createShortcuts)

// Default electron configs

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
