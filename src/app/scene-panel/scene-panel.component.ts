import Engineer from "./../engineer";

import { Component } from '@angular/core';

@Component(
{
    selector: 'scene-panel',
    templateUrl: './scene-panel.component.html',
    styleUrls: ['./scene-panel.component.css']
})
export class ScenePanelComponent
{
    private _Scene:any;
    public get Scene():any { return this._Scene; }
    public constructor()
    {
        this._Scene = new Engineer.Engine.Scene2D();
    }
    public ngOnInit() : void
    {

    }
}
