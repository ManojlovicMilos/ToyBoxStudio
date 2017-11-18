import Engineer from "./../../../engineer";

import { Input, Component } from '@angular/core';

import { SceneContainer } from "./../../scene-panel.model";

@Component(
{
    selector: 'scene-object-properties',
    templateUrl: './scene-object-properties.component.html',
    styleUrls: ['./scene-object-properties.component.css']
})
export class SceneObjectPropertiesComponent
{
    @Input() private Container:SceneContainer;
    public constructor()
    {
        
    }
}
