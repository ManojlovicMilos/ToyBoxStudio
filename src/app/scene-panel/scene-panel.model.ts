export { SceneContainer }

import Engineer from "./../engineer";

class SceneContainer
{
    private _Scene:any;
    private _Selected:any;
    public get Scene():any { return this._Scene; }
    public get Selected():any { return this._Selected; }
    public set Selected(value:any) { this._Selected = value; }
	constructor ()
	{
        this._Scene = new Engineer.Engine.Scene2D();
        this._Scene.Name = "New Scene";
        this._Scene.BackColor = Engineer.Math.Color.FromRGBA(0, 0, 0, 255);
    }
}