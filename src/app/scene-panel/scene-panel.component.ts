import { Component } from '@angular/core';

import { SceneContainer } from "./scene-panel.model";

@Component(
{
    selector: 'scene-panel',
    templateUrl: './scene-panel.component.html',
    styleUrls: ['./scene-panel.component.css']
})
export class ScenePanelComponent
{
    private _Model:SceneContainer;
    public get Model():SceneContainer { return this._Model; }
    public constructor()
    {
        this._Model = new SceneContainer();
    }
}
