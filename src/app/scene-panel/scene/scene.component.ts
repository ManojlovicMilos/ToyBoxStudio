import Engineer from "./../../engineer";

import { Input, Component } from '@angular/core';

import { SceneContainer } from "./../scene-panel.model";

@Component(
{
    selector: 'scene',
    templateUrl: './scene.component.html',
    styleUrls: ['./scene.component.css']
})
export class SceneComponent
{
    @Input() private Container:SceneContainer;
    public constructor()
    {
        
    }
    private Select(Object)
    {
        this.Container.Selected = Object;
    }
}
