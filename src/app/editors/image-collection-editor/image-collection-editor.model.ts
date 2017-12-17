export { ImageCollectionContainer }

import Engineer from "./../../engineer";

import { ActionController } from "./../controllers/action-manager.controller";
import { ResourcesController } from "./../../project/resources/resoures.controller";

class ImageCollectionContainer
{
    private _ImageCollection:any;
    private _Selected:any;
    private _Update:Function[];
    private _Actions:ActionController;
    private _Resources:ResourcesController;
    public get ImageCollection():any { return this._ImageCollection; }
    public set ImageCollection(value:any) { this._ImageCollection = value; }
    public get Selected():any { return this._Selected; }
    public set Selected(value:any) { this._Selected = value; }
    public get Update():Function[] { return this._Update; }
	constructor (ImageCollection:any, Resources:ResourcesController)
	{
        if(ImageCollection != null) this._ImageCollection = ImageCollection;
        else this._ImageCollection = [];
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
}