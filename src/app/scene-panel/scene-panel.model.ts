export { SceneContainer }

import Engineer from "./../engineer";

class SceneContainer
{
    private _Scene:any;
    private _Selected:any;
    private _Update:Function[];
    public get Scene():any { return this._Scene; }
    public get Selected():any { return this._Selected; }
    public set Selected(value:any) { this._Selected = value; }
    public get Update():Function[] { return this._Update; }
	constructor (Scene:any)
	{
        if(Scene) this._Scene = Scene;
        else this._Scene = new Engineer.Engine.Scene2D();
        this._Update = [];
    }
    public InvokeUpdate() : void
    {
        for(let i = 0; i < this._Update.length; i++)
        {
            this._Update[i]();
        }
    }
}