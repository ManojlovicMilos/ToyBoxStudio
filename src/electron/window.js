'use strict';

const { app, BrowserWindow } = require('electron');

const Menu = require("./menu");

class Window
{
    constructor(Width, Height)
    {
        this.Init(Width, Height);
    }
    Init(Width, Height)
    {
        this._Menu = new Menu();
        this._Window = new BrowserWindow({width: Width, height: Height, darkTheme:true});
        this._Window.setMenu(this._Menu.Menu);
        let Path = "C:/Users/DeinVenteD/Projects/My/ToyBoxStudio/dist/index.html";
        this._Window.loadURL(Path);
        this.Event("closed", this.Close.bind(this));
    }
    Event(Name, Callback)
    {
        this._Window.on(Name, () => Callback());
    }
    Close()
    {
        this._Window = null;
    }
}

module.exports = Window;