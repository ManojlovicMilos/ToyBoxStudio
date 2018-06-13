export { SceneContainer }

import Engineer from "./../../../engineer";

import { ActionController } from "./../../controllers/action-manager.controller";
import { ResourcesController } from "./../../../project/resources/resoures.controller";

class SceneContainer
{
    private _Scene:Engineer.Scene2D;
    private _Selected:any;
    private _Clipboard:any;
    private _Update:Function[];
    private _Actions:ActionController;
    private _Resources:ResourcesController;
    public get Scene():Engineer.Scene2D { return this._Scene; }
    public set Scene(value:Engineer.Scene2D) { this._Scene = value; this._Selected = null; }
    public get Selected():any { return this._Selected; }
    public set Selected(value:any) { this._Selected = value; }
    public get Update():Function[] { return this._Update; }
    public get Resources():ResourcesController { return this._Resources; }
	constructor (Scene:any, Resources:ResourcesController)
	{
        if(Scene) this._Scene = Scene;
        else this._Scene = new Engineer.Scene2D();
        this._Resources = Resources;
        this._Update = [];
        this._Actions = new ActionController();
    }
    public InvokeUpdate() : void
    {
        for(let i = 0; i < this._Update.length; i++)
        {
            this._Update[i]();
        }
    }
    public SetAction(Action:any) : void
    {
        this._Actions.PushAction(Action);
    }
    public Undo() : void
    {
        this._Actions.Undo();
    }
    public Redo() : void
    {
        this._Actions.Redo();
    }
    public Copy() : void
    {
        if(this._Selected != null)
        {
            this._Clipboard = this._Selected;
        }
    }
    public Paste() : void
    {
        if(this._Clipboard != null)
        {
            this._Scene.Attach(this._Clipboard.Copy());
            this._Clipboard = null; // Temp
        }
    }
    public Delete() : void
    {
        if(this._Selected != null)
        {
            this._Scene.Remove(this._Selected);
            this._Selected = null;
        }
    }
}