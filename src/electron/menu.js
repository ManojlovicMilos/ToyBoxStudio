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
        this.CreateHelpMenu();
    }
    CreateFileMenu(Actions)
    {
        let NewOptionItem = new MenuItem({label:"New", click:Actions[0]});
        let OpenOptionItem = new MenuItem({label:"Open", click:Actions[1]});
        let SaveOptionItem = new MenuItem({label:"Save"});
        let Separator = new MenuItem({type:"separator"});
        let ExitOptionItem = new MenuItem({label:"Exit", click:this.Exit.bind(this)});
        this._FileMenuItem = new MenuItem({label:"File", submenu:[NewOptionItem, OpenOptionItem, SaveOptionItem, Separator, ExitOptionItem]});
        this._Menu.insert(0, this._FileMenuItem);
    }
    CreateProjectMenu(Actions)
    {
        let RunOptionItem = new MenuItem({label:"Run"});
        let Separator = new MenuItem({type:"separator"});
        let AddScene = new MenuItem({label:"Scene", click:Actions[0]});
        let AddOptionItem = new MenuItem({label:"Add", submenu:[AddScene]});
        this._ProjectMenuItem = new MenuItem({label:"Project", submenu:[RunOptionItem, Separator, AddOptionItem]});
        this._Menu.insert(1, this._ProjectMenuItem);
    }
    CreateHelpMenu()
    {
        let HelpOptionItem = new MenuItem({label:"Help", click:this.ShowHelp.bind(this)});
        this._HelpMenuItem = new MenuItem({label:"Help", submenu:[HelpOptionItem]});
        this._Menu.append(this._HelpMenuItem);
    }
    ShowHelp()
    {
        this._HelpWindow = new BrowserWindow({width: 800, height: 600, darkTheme:true});
        this._HelpWindow.setMenu(null);
        this._HelpWindow.loadURL("www.google.com");
    }
    Exit()
    {
        app.quit();
    }
}

module.exports = MainMenu;