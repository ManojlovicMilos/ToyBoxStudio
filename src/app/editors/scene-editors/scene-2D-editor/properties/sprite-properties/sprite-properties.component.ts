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
    @Input() private Container:SceneContainer;
    private _CurrentSet:string;
    private _CurrentActivatedSet:string;
    public constructor() {}
    public ngOnInit() : void
    {
        this._CurrentSet = " - Select - ";
        this._CurrentActivatedSet = "";
        this.InitSet();
    }
    private InitSet() : void
    {
        if(this.Container.Selected.SpriteSets !== null && this.Container.Selected.SpriteSets.length > 0)
        {
            this._CurrentSet = this.Container.Selected.SpriteSets[this.Container.Selected.CurrentSpriteSet].Name;
        }
    }
    private UpdateSet() : void
    {
        if(this._CurrentSet != " - Select - " && this.Container.Resources.SpriteSets[this._CurrentSet] != null)
        {
            let Value = this.Container.Resources.SpriteSets[this._CurrentSet].Value;
            this.Container.Selected.SpriteSets = Value;
            this.Container.Selected.Modified = true;
            if(this.Container.Selected.SpriteSets !== null && this.Container.Selected.SpriteSets.length > 0)
            {
                this._CurrentActivatedSet = this.Container.Selected.SpriteSets[0].Name;
            }
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
