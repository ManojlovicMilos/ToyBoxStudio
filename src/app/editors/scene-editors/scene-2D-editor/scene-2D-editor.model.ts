export { SceneContainer }

import Engineer from "./../../../engineer";

import { ActionController } from "./../../controllers/action-manager.controller";

class SceneContainer
{
    private _Scene:any;
    private _Selected:any;
    private _Update:Function[];
    private _Actions:ActionController;
    public get Scene():any { return this._Scene; }
    public set Scene(value:any) { this._Scene = value; this._Selected = null; }
    public get Selected():any { return this._Selected; }
    public set Selected(value:any) { this._Selected = value; }
    public get Update():Function[] { return this._Update; }
	constructor (Scene:any)
	{
        if(Scene) this._Scene = Scene;
        else this._Scene = new Engineer.Engine.Scene2D();
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
}