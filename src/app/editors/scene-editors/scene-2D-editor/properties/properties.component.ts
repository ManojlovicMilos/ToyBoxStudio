import Engineer from "./../../../../engineer";

import { Input, Component } from '@angular/core';

import { SceneContainer } from "./../scene-2D-editor.model";

@Component(
{
    selector: 'properties',
    templateUrl: './properties.component.html',
    styleUrls: ['./properties.component.css']
})
export class PropertiesComponent
{
    @Input() private Container:SceneContainer;
    public constructor() {}
    private IsOfType(Type:string) : boolean
    {
        if(Type == "Drawn") return this.Container.Selected.Type == Engineer.SceneObjectType.Drawn;
        return false;
    }
    private IsOfDrawnType(DrawType:string) : boolean
    {
        if(this.Container.Selected.Type == Engineer.SceneObjectType.Drawn)
        {
            if(DrawType == "Sprite") return this.Container.Selected.DrawType == Engineer.DrawObjectType.Sprite;
            if(DrawType == "Tile") return this.Container.Selected.DrawType == Engineer.DrawObjectType.Tile;
        }
        return false;
    }
}
