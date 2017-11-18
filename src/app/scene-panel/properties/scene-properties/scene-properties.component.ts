import Engineer from "./../../../engineer";

import { Input, Component } from '@angular/core';

import { SceneContainer } from "./../../scene-panel.model";

@Component(
{
    selector: 'scene-properties',
    templateUrl: './scene-properties.component.html',
    styleUrls: ['./scene-properties.component.css']
})
export class ScenePropertiesComponent
{
    @Input() private Container:SceneContainer;
    public constructor()
    {
        
    }
}
