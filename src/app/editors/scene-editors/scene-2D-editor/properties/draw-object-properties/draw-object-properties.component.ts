import Engineer from "./../../../../../engineer";

import { Input, Component } from '@angular/core';

import { SceneContainer } from "./../../scene-2D-editor.model";

@Component(
{
    selector: 'draw-object-properties',
    templateUrl: './draw-object-properties.component.html',
    styleUrls: ['./draw-object-properties.component.css']
})
export class DrawObjectPropertiesComponent
{
    @Input() private Container:SceneContainer;
    private _Paint:any;
    public constructor()
    {
        this._Paint = 0xFF0000;
    }
    private ColorChange(Value:string)
    {
        this.Container.Selected.Paint = Engineer.Color.FromString(Value);
        this.Container.Selected.Modified = true;
    }
}
