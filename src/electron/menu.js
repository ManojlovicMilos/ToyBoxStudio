'use strict';

const { app, BrowserWindow, Menu, MenuItem } = require('electron');

class MainMenu
{
    get Menu() { return this._Menu; }
    get FileMenu() { return this._FileMenuItem; }
    constructor()
    {
        this.Init();
    }
    Init()
    {
        this._Menu = new Menu();
        this.CreateProjectMenu();
        this.CreateHelpMenu();
    }
    CreateFileMenu(Actions)
    {
        let NewOptionItem = new MenuItem({label:"New", click:Actions[0]});
        let OpenOptionItem = new MenuItem({label:"Open"});
        let SaveOptionItem = new MenuItem({label:"Save"});
        let Separator = new MenuItem({type:"separator"});
        let ExitOptionItem = new MenuItem({label:"Exit", click:this.Exit.bind(this)});
        this._FileMenuItem = new MenuItem({label:"File", submenu:[NewOptionItem, OpenOptionItem, SaveOptionItem, Separator, ExitOptionItem]});
        this._Menu.insert(0, this._FileMenuItem);
    }
    CreateProjectMenu()
    {
        let RunOptionItem = new MenuItem({label:"Run"});
        let Separator = new MenuItem({type:"separator"});
        let AddOptionItem = new MenuItem({label:"Add"});
        this._ProjectMenuItem = new MenuItem({label:"Project", submenu:[RunOptionItem, Separator, AddOptionItem]});
        this._Menu.append(this._ProjectMenuItem);
    }
    CreateHelpMenu()
    {
        let HelpOptionItem = new MenuItem({label:"Help"});
        this._HelpMenuItem = new MenuItem({label:"Help", submenu:[HelpOptionItem]});
        this._Menu.append(this._HelpMenuItem);
    }
    Exit()
    {
        app.quit();
    }
}

module.exports = MainMenu;