'use strict';

const { app, BrowserWindow, globalShortcut } = require('electron');

class Window
{
    get MainMenu() { return this._Menu; }
    get Window() { return this._Window; }
    constructor(Width, Height, Path)
    {
        this.Init(Width, Height, Path);
    }
    Init(Width, Height, Path)
    {
        this._Window = new BrowserWindow(
            {
                width: Width,
                height: Height,
                darkTheme: true,
                webPreferences: { nodeIntegration: true, webSecurity: false }
            }
        );
        this._Window.loadURL('file://' + Path);
        this.Event("closed", this.Close.bind(this));
        globalShortcut.register('CommandOrControl+R', this.Reload.bind(this));
        globalShortcut.register('CommandOrControl+D', this.DevTools.bind(this));
    }
    ActivateMenu()
    {
        this._Window.setMenu(null);
    }
    Reload()
    {
        this._Window.reload();
    }
    DevTools()
    {
        this._Window.webContents.openDevTools()
    }
    Web()
    {
        return this._Window.webContents;
    }
    Event(Name, Callback)
    {
        this._Window.on(Name, () => Callback());
    }
    Send(eventName, data)
    {
        this._Window.webContents.send(eventName, data);
    }
    Close()
    {
        this._Window = null;
    }
}

module.exports = Window;