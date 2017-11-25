export { Menu }

import { app, BrowserWindow } from 'electron';

class Menu
{
    private _Menu:any;
    public get Menu():any { return this._Menu; }
    public constructor()
    {
        this.Init();
    }
    private Init() : void
    {
        this._Menu = null;
    }
}