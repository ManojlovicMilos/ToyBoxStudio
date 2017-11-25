export { Window }

import * as fs from 'fs';
import { app, BrowserWindow } from 'electron';

import { Menu } from "./menu";

class Window
{
    private _Menu:Menu;
    private _Window:any;
    public constructor(Width:number, Height:number)
    {
        this.Init(Width, Height);
    }
    private Init(Width:number, Height:number) : void
    {
        this._Menu = new Menu();
        this._Window = new BrowserWindow({width: Width, height: Height, darkTheme:true});
        this._Window.setMenu(this._Menu.Menu);
        let Path:string = "C:/Users/DeinVenteD/Projects/My/ToyBoxStudio/dist/index.html";
        this._Window.loadUrl(Path);
        this.Event("closed", this.Close.bind(this));
    }
    public Event(Name:string, Callback:Function) : void
    {
        this._Window.on(Name, () => Callback());
    }
    private Close() : void
    {
        this._Window = null;
    }
}