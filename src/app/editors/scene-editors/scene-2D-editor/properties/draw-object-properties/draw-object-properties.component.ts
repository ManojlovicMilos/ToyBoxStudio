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
    public constructor()
    {
        
    }
}
