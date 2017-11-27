'use strict';

const { app, BrowserWindow } = require("electron");

const Path = __dirname + "/../../dist/"

const args = process.argv.slice(1);
let serve = args.some(val => val === '--serve');
if (serve)
{
    require('electron-reload')
    (__dirname,{
        electron: require('${__dirname}/../../node_modules/electron')
    });
}

const Window = require("./window");

class App
{
    constructor()
    {
        this._App = app;
        this.Init();
    }
    Init()
    {
        this.Event("ready", this.CreateMainWindow.bind(this));
        this.Event("activate", this.CreateMainWindow.bind(this));
        this.Event("window-all-closed", this.AllWindowsClosed.bind(this));
    }
    Event(Name, Callback)
    {
        this._App.on(Name, () => Callback());
    }
    CreateMainWindow()
    {
        if(!this._MainWindow)
        {
            this._MainWindow = new Window(1366, 768, Path + "index.html");
        }
    }
    AllWindowsClosed()
    {
        if (process.platform !== 'darwin')
        {
            this._App.quit()
        }
    }
}

module.exports = App;