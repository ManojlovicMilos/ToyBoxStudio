import Engineer from "./../../engineer";

import { Input, Component } from '@angular/core';

import { SceneContainer } from "./../scene-panel.model";

@Component(
{
    selector: 'properties',
    templateUrl: './properties.component.html',
    styleUrls: ['./properties.component.css']
})
export class PropertiesComponent
{
    @Input() private Container:SceneContainer;
    public constructor()
    {
        
    }
    private IsOfType(Type:string) : boolean
    {
        if(Type == "Drawn") return this.Container.Selected.Type == Engineer.Engine.SceneObjectType.Drawn;
        return false;
    }
}
