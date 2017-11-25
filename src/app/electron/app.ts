export { App }

import { app, BrowserWindow } from 'electron';

import { Window } from "./window";

class App
{
    private _App;
    private _MainWindow;
    public constructor()
    {
        this._App = app;
        this.Init();
    }
    private Init() : void
    {
        this.Event("ready", this.CreateMainWindow.bind(this));
        this.Event("activate", this.CreateMainWindow.bind(this));
        this.Event("window-all-closed", this.AllWindowsClosed.bind(this));
    }
    public Event(Name:string, Callback:Function) : void
    {
        this._App.on(Name, () => Callback());
    }
    private CreateMainWindow() : void
    {
        if(!this._MainWindow)
        {
            this._MainWindow = new Window(1366, 768);
        }
    }
    private AllWindowsClosed() : void
    {
        if (process.platform !== 'darwin')
        {
            this._App.quit()
        }
    }
}