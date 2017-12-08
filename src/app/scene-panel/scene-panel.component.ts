import { Input, Component } from '@angular/core';

import { SceneContainer } from "./scene-panel.model";

@Component(
{
    selector: 'scene-panel',
    templateUrl: './scene-panel.component.html',
    styleUrls: ['./scene-panel.component.css']
})
export class ScenePanelComponent
{
    @Input() private Scene:any;
    private _Model:SceneContainer;
    public get Model():SceneContainer { return this._Model; }
    public constructor() {}
    private ngOnInit() : void
    {
        this._Model = new SceneContainer(this.Scene);
    }
}
