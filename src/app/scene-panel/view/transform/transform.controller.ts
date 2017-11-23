export { TransformController }

import Engineer from "./../../../engineer";

import { SceneContainer } from "./../../scene-panel.model";

const TransformEventsSetKey:string = "EDITOR_TRANSFORM_EVENTS_SET";
const TransformLastLocationKey:string = "EDITOR_TRANSFORM_LAST_LOCATION";
const TransformUnsnappedTranslationKey:string = "EDITOR_TRANSFORM_UNSNAPPED_TRANSLATION";
const TransformUnsnappedRotationKey:string = "EDITOR_TRANSFORM_UNSNAPPED_ROTATION";
const TransformUnsnappedScaleKey:string = "EDITOR_TRANSFORM_UNSNAPPED_SCALE";

enum TransformMode
{
    Translate = 0,
    Rotate = 1,
    Scale = 2
}
enum TransformSnapMode
{
    NoSnap = 0,
    AutoSnap = 1,
    FixedSnap = 2
}
class TransformController
{
    private _Mode:TransformMode;
    private _SnapMode:TransformSnapMode;
    private _FixedSnapOffset:number;
    private _SceneContainer:SceneContainer;
    public get Mode():TransformMode { return this._Mode; }
    public set Mode(value:TransformMode) { this._Mode = value; }
    public get SnapMode():TransformSnapMode { return this._SnapMode; }
    public set SnapMode(value:TransformSnapMode) { this._SnapMode = value; }
    public get FixedSnapOffset():number { return this._FixedSnapOffset; }
    public set FixedSnapOffset(value:number) { this._FixedSnapOffset = value; }
	constructor (SceneContainer:SceneContainer)
	{
        this._Mode = TransformMode.Translate;
        this._SnapMode = TransformSnapMode.NoSnap;
        this._FixedSnapOffset = 100;
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
                this._SceneContainer.Selected.Data[TransformUnsnappedTranslationKey] = null;
                this._SceneContainer.Selected.Data[TransformUnsnappedRotationKey] = null;
                this._SceneContainer.Selected.Data[TransformUnsnappedScaleKey] = null;
            }
        }
    }
    private SceneMouseMove(Game:any, Args:any) : void
    {
        if(this._SceneContainer.Selected && this._SceneContainer.Selected.Data[TransformLastLocationKey])
        {
            let Target = this._SceneContainer.Selected
            let LastLocation = Target.Data[TransformLastLocationKey];
            if(this._Mode == TransformMode.Translate)
            {
                let Translation:any = Target.Trans.Translation;
                let UnsnappedTranslation:any = Target.Data[TransformUnsnappedTranslationKey];
                if(!UnsnappedTranslation) UnsnappedTranslation = Translation;
                Target.Trans.Translation = this.Snap2DValue(new Engineer.Math.Vertex(UnsnappedTranslation.X + (Args.Location.X - LastLocation.X), UnsnappedTranslation.Y + (Args.Location.Y - LastLocation.Y), Translation.Z));
                Target.Data[TransformUnsnappedTranslationKey] = new Engineer.Math.Vertex(UnsnappedTranslation.X + (Args.Location.X - LastLocation.X), UnsnappedTranslation.Y + (Args.Location.Y - LastLocation.Y), Translation.Z);
            }
            else if(this._Mode == TransformMode.Rotate)
            {
                let Rotation:any = Target.Trans.Rotation;
                let UnsnappedRotation:any = Target.Data[TransformUnsnappedRotationKey];
                if(!UnsnappedRotation) UnsnappedRotation = Rotation;
                Target.Trans.Rotation = new Engineer.Math.Vertex(Rotation.X, Rotation.Y, this.CalculateNewOffset(UnsnappedRotation.Z + (Args.Location.X - LastLocation.X)));
                Target.Data[TransformUnsnappedRotationKey] = new Engineer.Math.Vertex(Rotation.X, Rotation.Y, UnsnappedRotation.Z + (Args.Location.X - LastLocation.X));
            }
            else if(this._Mode == TransformMode.Scale)
            {
                let Scale:any = Target.Trans.Scale;
                let UnsnappedScale:any = Target.Data[TransformUnsnappedScaleKey];
                if(!UnsnappedScale) UnsnappedScale = Scale;
                Target.Trans.Scale = this.Snap2DValue(new Engineer.Math.Vertex(UnsnappedScale.X + (Args.Location.X - LastLocation.X), UnsnappedScale.Y + (Args.Location.Y - LastLocation.Y), Scale.Z));
                Target.Data[TransformUnsnappedScaleKey] = new Engineer.Math.Vertex(UnsnappedScale.X + (Args.Location.X - LastLocation.X), UnsnappedScale.Y + (Args.Location.Y - LastLocation.Y), Scale.Z);
            }
            Target.Data[TransformLastLocationKey] = Args.Location;
        }
        else if(this._SceneContainer.Scene.Data[TransformLastLocationKey])
        {
            let Target = this._SceneContainer.Scene;
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
    private Snap2DValue(Value:any) : any
    {
        if(this._SnapMode == TransformSnapMode.NoSnap)
        {
            return Value;
        }
        else if(this._SnapMode == TransformSnapMode.FixedSnap)
        {
            return new Engineer.Math.Vertex(this.CalculateNewOffset(Value.X), this.CalculateNewOffset(Value.Y), Value.Z);
        }
        else return Value;
    }
    private CalculateNewOffset(Value:number) : number
    {
        let Negative:boolean = Value < 0;
        Value = Math.abs(Value);
        let Ammount:number = Math.floor(Value / this._FixedSnapOffset);
        let NewValue:number = Ammount * this._FixedSnapOffset + this.CalculateExtraOffset(Value);
        if(Negative) NewValue *= -1;
        return NewValue;
    }
    private CalculateExtraOffset(Value:number) : number
    {
        let NewValue = Value;
        while(NewValue > this._FixedSnapOffset) NewValue -= this._FixedSnapOffset;
        if(NewValue > this._FixedSnapOffset / 2) return this._FixedSnapOffset;
        return 0;
    }
}