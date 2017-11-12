export { SceneContainer }

import Engineer from "./../engineer";

class SceneContainer
{
    private _Scene:any;
    private _Selected:any;
    public get Scene():any { return this._Scene; }
    public get Selected():any { return this._Selected; }
	constructor ()
	{
        this._Scene = new Engineer.Engine.Scene2D();
    }
}