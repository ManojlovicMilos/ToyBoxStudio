import { Input, Component } from '@angular/core';

import { SceneContainer } from "./scene-2D-editor.model";
import { ResourcesController } from "./../../../project/resources/resoures.controller";

@Component(
{
    selector: 'scene-2D-editor',
    templateUrl: './scene-2D-editor.component.html',
    styleUrls: ['./scene-2D-editor.component.css']
})
export class Scene2DEditorComponent
{
    @Input() private Scene:any;
    @Input() private Resources:ResourcesController;
    private _Model:SceneContainer;
    public get Model():SceneContainer { return this._Model; }
    public constructor() {}
    private ngOnInit() : void
    {
        this._Model = new SceneContainer(this.Scene, this.Resources);
    }
}
