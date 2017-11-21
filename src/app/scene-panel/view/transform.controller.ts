export { TransformController }

import Engineer from "./../../engineer";

import { SceneContainer } from "./../scene-panel.model";

const TransformEventsSetKey:string = "EDITOR_TRANSFORM_EVENTS_SET";
const TransformLastLocationKey:string = "EDITOR_TRANSFORM_LAST_LOCATION";

class TransformController
{
    private _SceneContainer:SceneContainer;
	constructor (SceneContainer:SceneContainer)
	{
        this._SceneContainer = SceneContainer;
        this._SceneContainer.Update.push(this.Update.bind(this));
        this.Update();
    }
    private Update() : void
    {
        this.SetSceneEvents();
        this.SetObjectsEvents();
    }
    private SetSceneEvents() : void
    {
        if(!this._SceneContainer.Scene.Data[TransformEventsSetKey])
        {
            this._SceneContainer.Scene.Events.MouseDown.push(this.SceneMouseDown.bind(this));
            this._SceneContainer.Scene.Events.MouseUp.push(this.SceneMouseUp.bind(this));
            this._SceneContainer.Scene.Events.MouseMove.push(this.SceneMouseMove.bind(this));
            this._SceneContainer.Scene.Data[TransformEventsSetKey] = true;
        }
    }
    private SetObjectsEvents() : void
    {
        for(let i in this._SceneContainer.Scene.Objects)
        {
            if(!this._SceneContainer.Scene.Objects[i].Data[TransformEventsSetKey])
            {
                this._SceneContainer.Scene.Objects[i].Events.MouseDown.push(this.ObjectMouseDown.bind(this));
                this._SceneContainer.Scene.Objects[i].Data[TransformEventsSetKey] = true;
            }
        }
    }
    private SceneMouseDown(Game:any, Args:any) : void
    {
        if(Args.MouseButton == Engineer.Engine.MouseButton.Left)
        {
            this._SceneContainer.Scene.Data[TransformLastLocationKey] = Args.Location;
        }
    }
    private SceneMouseUp(Game:any, Args:any) : void
    {
        if(Args.MouseButton == Engineer.Engine.MouseButton.Left)
        {
            this._SceneContainer.Scene.Data[TransformLastLocationKey] = null;
            if(this._SceneContainer.Selected)
            {
                this._SceneContainer.Selected.Data[TransformLastLocationKey] = null;
            }
        }
    }
    private SceneMouseMove(Game:any, Args:any) : void
    {
        let Target = (this._SceneContainer.Selected && this._SceneContainer.Selected .Data[TransformLastLocationKey]) ? this._SceneContainer.Selected : this._SceneContainer.Scene;
        if(Target && Target.Data[TransformLastLocationKey])
        {
            let Translation:any = Target.Trans.Translation;
            let LastLocation = Target.Data[TransformLastLocationKey];
            Target.Trans.Translation = new Engineer.Math.Vertex(Translation.X + (Args.Location.X - LastLocation.X), Translation.Y + (Args.Location.Y - LastLocation.Y), Translation.Z);
            Target.Data[TransformLastLocationKey] = Args.Location;
        }
    }
    private ObjectMouseDown(Game:any, Args:any) : boolean
    {
        if(Args.MouseButton == Engineer.Engine.MouseButton.Left)
        {
            if(Args.Sender && this._SceneContainer.Scene.Objects.indexOf(Args.Sender) != -1)
            {
                this._SceneContainer.Selected = Args.Sender;
                this._SceneContainer.Selected .Data[TransformLastLocationKey] = Args.Location;
                return true;
            }
        }
        return false;
    }
}