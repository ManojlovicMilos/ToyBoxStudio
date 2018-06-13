import Engineer from "./../../../../../engineer";

import { Input, Component } from '@angular/core';

import { SceneContainer } from "./../../scene-2D-editor.model";

@Component(
{
    selector: 'sprite-properties',
    templateUrl: './sprite-properties.component.html',
    styleUrls: ['./sprite-properties.component.css']
})
export class SpritePropertiesComponent
{
    @Input() private Selected:any;
    @Input() private Container:SceneContainer;
    private _CurrentSet:string;
    private _CurrentActivatedSet:string;
    public constructor()
    {
        this._CurrentSet = "";
    }
    public ngOnInit() : void
    {
        this._CurrentSet = "";
        this._CurrentActivatedSet = "";
        this.InitSet();
    }
    private InitSet() : void
    {
        if(this.Container.Selected.Collection != null && this.Container.Resources.SpriteSetsCollections[this.Container.Selected.Collection.Origin] != null)
        {
            this._CurrentSet = this.Container.Selected.Collection.Origin;
        }
    }
    private UpdateSet() : void
    {
        if(this._CurrentSet != "" && this.Container.Resources.SpriteSetsCollections[this._CurrentSet] != null)
        {
            let Value = this.Container.Resources.SpriteSetsCollections[this._CurrentSet].Value;
            console.log(Value);
            this.Container.Selected.Collection = Value;
            this.Container.Selected.Modified = true;
            if(this.Container.Selected.Collection != null && this.Container.Selected.SpriteSets.length > 0)
            {
                this._CurrentActivatedSet = this.Container.Selected.SpriteSets[0].Name;
            }
        }
        else if(this._CurrentSet == "")
        {
            this.Container.Selected.Collection = new Engineer.SpriteSetCollection(null, []);
        }
    }
    private ActivateSet(SetName:string) : void
    {
        if(this.Container.Selected.SpriteSets !== null && this.Container.Selected.SpriteSets.length > 0)
        {
            this.Container.Selected.SetSpriteSetByName(SetName);
        }
    }
}
