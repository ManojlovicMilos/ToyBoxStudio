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
    public constructor() {}
    public ngOnInit()
    {
        this._CurrentSet = " - Select - ";
    }
    private UpdateSet() : void
    {
        if(this._CurrentSet != " - Select - " && this.Container.Resources.SpriteSets[this._CurrentSet] != null)
        {
            let Value = this.Container.Resources.SpriteSets[this._CurrentSet].Value;
            this.Container.Selected.SpriteSets = Value;
            this.Container.Selected.Modified = true;
        }
    }
}
