export { SpriteSetCollectionContainer }

import Engineer from "./../../engineer";

import { ActionController } from "./../controllers/action-manager.controller";
import { ResourcesController } from "./../../project/resources/resoures.controller";

class SpriteSetCollectionContainer
{
    private _SpriteSetCollection:Engineer.SpriteSetCollection;
    private _Selected:any;
    private _Update:Function[];
    private _Actions:ActionController;
    private _Resources:ResourcesController;
    public get SpriteSetCollection():Engineer.SpriteSetCollection { return this._SpriteSetCollection; }
    public set SpriteSetCollection(value:Engineer.SpriteSetCollection) { this._SpriteSetCollection = value; }
    public get Selected():any { return this._Selected; }
    public set Selected(value:any) { this._Selected = value; }
    public get Update():Function[] { return this._Update; }
	constructor (SpriteSetCollection:Engineer.SpriteSetCollection, Resources:ResourcesController)
	{
        if(SpriteSetCollection != null) this._SpriteSetCollection = SpriteSetCollection;
        else this._SpriteSetCollection = new Engineer.SpriteSetCollection(null, []);
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
        let NewSpriteSet = new Engineer.SpriteSet(null, [], Name);
        this._SpriteSetCollection.SpriteSets.push(NewSpriteSet);
    }
    public RemoveSpriteSet(Set:any)
    {
        this._SpriteSetCollection.SpriteSets.splice(this._SpriteSetCollection.SpriteSets.indexOf(Set), 1);
    }
}