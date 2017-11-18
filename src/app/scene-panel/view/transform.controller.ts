export { TransformController }

import Engineer from "./../../engineer";

import { SceneContainer } from "./../scene-panel.model";

class TransformController
{
    private _OnMove:boolean;
    private _LastLocation:any;
    private _SceneContainer:SceneContainer;
	constructor (SceneContainer:SceneContainer)
	{
        this._OnMove = false;
        this._SceneContainer = SceneContainer;
        this._SceneContainer.Scene.Events.MouseDown.push(this.MouseDown.bind(this));
        this._SceneContainer.Scene.Events.MouseUp.push(this.MouseUp.bind(this));
        this._SceneContainer.Scene.Events.MouseMove.push(this.MouseMove.bind(this));
    }
    private MouseDown(Game:any, Args:any) : void
    {
        if(Args.MouseButton == Engineer.Engine.MouseButton.Left)
        {
            this._OnMove = true;
            this._LastLocation = Args.Location;
        }
    }
    private MouseUp(Game:any, Args:any) : void
    {
        if(Args.MouseButton == Engineer.Engine.MouseButton.Left)
        {
            this._OnMove = false;
        }
    }
    private MouseMove(Game:any, Args:any) : void
    {
        if(this._OnMove && this._SceneContainer.Selected)
        {
            let Translation:any = this._SceneContainer.Selected.Trans.Translation;
            this._SceneContainer.Selected.Trans.Translation = new Engineer.Math.Vertex(Translation.X + (Args.Location.X - this._LastLocation.X), Translation.Y + (Args.Location.Y - this._LastLocation.Y), Translation.Z);
        }
        this._LastLocation = Args.Location;
    }
}