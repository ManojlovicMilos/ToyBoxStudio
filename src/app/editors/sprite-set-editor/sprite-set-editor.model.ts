export { SpriteSetContainer }

import Engineer from "./../../engineer";

import { ActionController } from "./../controllers/action-manager.controller";
import { ResourcesController } from "./../../project/resources/resoures.controller";

class SpriteSetContainer
{
    private _SpriteSet:any;
    private _Selected:any;
    private _Update:Function[];
    private _Actions:ActionController;
    private _Resources:ResourcesController;
    public get SpriteSet():any { return this._SpriteSet; }
    public set SpriteSet(value:any) { this._SpriteSet = value; }
    public get Selected():any { return this._Selected; }
    public set Selected(value:any) { this._Selected = value; }
    public get Update():Function[] { return this._Update; }
	constructor (SpriteSet:any, Resources:ResourcesController)
	{
        if(SpriteSet != null) this._SpriteSet = SpriteSet;
        else this._SpriteSet = [];
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
    public AddSpriteSet(Name:string) : void
    {
        let NewSpriteSet = new Engineer.Engine.SpriteSet(null, Name, []);
        this._SpriteSet.push(NewSpriteSet);
    }
}