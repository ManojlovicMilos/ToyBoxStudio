'use strict';

const { app, BrowserWindow } = require("electron");

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
            this._MainWindow = new Window(1366, 768);
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