'use strict';

const { app, BrowserWindow, Menu, MenuItem } = require('electron');

class MainMenu
{
    get Menu() { return this._Menu; }
    constructor()
    {
        this.Init();
    }
    Init()
    {
        this._Menu = new Menu();
        this.CreateFileMenu();
        this.CreateProjectMenu();
        this.CreateHelpMenu();
    }
    CreateFileMenu()
    {
        let NewOptionItem = new MenuItem({label:"New"});
        let OpenOptionItem = new MenuItem({label:"Open"});
        let SaveOptionItem = new MenuItem({label:"Save"});
        let Separator = new MenuItem({type:"separator"});
        let ExitOptionItem = new MenuItem({label:"Exit", click:this.Exit.bind(this)});
        let FileMenuItem = new MenuItem({label:"File", submenu:[NewOptionItem, OpenOptionItem, SaveOptionItem, Separator, ExitOptionItem]});
        this._Menu.append(FileMenuItem);
    }
    CreateProjectMenu()
    {
        let RunOptionItem = new MenuItem({label:"Run"});
        let Separator = new MenuItem({type:"separator"});
        let AddOptionItem = new MenuItem({label:"Add"});
        let ProjectMenuItem = new MenuItem({label:"Project", submenu:[RunOptionItem, Separator, AddOptionItem]});
        this._Menu.append(ProjectMenuItem);
    }
    CreateHelpMenu()
    {
        let HelpOptionItem = new MenuItem({label:"Help"});
        let HelpMenuItem = new MenuItem({label:"Help", submenu:[HelpOptionItem]});
        this._Menu.append(HelpMenuItem);
    }
    Exit()
    {
        app.quit();
    }
}

module.exports = MainMenu;