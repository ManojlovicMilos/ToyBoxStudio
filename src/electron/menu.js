'use strict';

const { app, BrowserWindow } = require('electron');

class Menu
{
    get Menu() { return this._Menu; }
    constructor()
    {
        this.Init();
    }
    Init()
    {
        this._Menu = null;
    }
}

module.exports = Menu;