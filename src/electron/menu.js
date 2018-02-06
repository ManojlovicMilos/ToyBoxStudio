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
        let SaveOptionItem = new MenuItem({label:"Save", click:Actions[2]});
        let Separator = new MenuItem({type:"separator"});
        let ExitOptionItem = new MenuItem({label:"Exit", click:this.Exit.bind(this)});
        this._FileMenuItem = new MenuItem({label:"File", submenu:[NewOptionItem, OpenOptionItem, SaveOptionItem, Separator, ExitOptionItem]});
        this._Menu.insert(0, this._FileMenuItem);
    }
    CreateEditMenu(Actions)
    {
        let CopyOptionItem = new MenuItem({label:"Copy", click:Actions[0], accelerator:"CommandOrControl+C"});
        let PasteOptionItem = new MenuItem({label:"Paste", click:Actions[1], accelerator:"CommandOrControl+V"});
        this._EditMenuItem = new MenuItem({label:"Edit", submenu:[CopyOptionItem, PasteOptionItem]});
        this._Menu.insert(1, this._EditMenuItem);
    }
    CreateProjectMenu(Actions)
    {
        let RunOptionItem = new MenuItem({label:"Run"});

        let Separator = new MenuItem({type:"separator"});

        let AddScriptItem = new MenuItem({label:"Script", click:Actions[3]});

        let TextureResourceItem = new MenuItem({label:"Texture"});
        let MaterialResourceItem = new MenuItem({label:"Material"});
        let SpriteSetResourceItem = new MenuItem({label:"SpriteSet", click:Actions[1]});
        let ImageCollectionResourceItem = new MenuItem({label:"ImageCollection", click:Actions[2]});
        let SoundResourceItem = new MenuItem({label:"Sound"});
        let Object3DResourceItem = new MenuItem({label:"Object3D"});

        let AddResourceItem = new MenuItem({label:"Resource", submenu:[SpriteSetResourceItem, ImageCollectionResourceItem]});
        
        let AddScene2DItem = new MenuItem({label:"Scene2D", click:Actions[0]});
        let AddScene3DItem = new MenuItem({label:"Scene3D"});
        let AddPresentationtem = new MenuItem({label:"Presentation"});
        let AddSceneItem = new MenuItem({label:"Scene", submenu:[AddScene2DItem]});

        let AddOptionItem = new MenuItem({label:"Add", submenu:[AddScriptItem, AddSceneItem, AddResourceItem]});

        this._ProjectMenuItem = new MenuItem({label:"Project", submenu:[RunOptionItem, Separator, AddOptionItem]});

        this._Menu.insert(2, this._ProjectMenuItem);
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