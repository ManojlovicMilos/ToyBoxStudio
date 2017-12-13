import { Input, Component } from '@angular/core';

import { SceneContainer } from "./scene-2D-editor.model";

@Component(
{
    selector: 'scene-2D-editor',
    templateUrl: './scene-2D-editor.component.html',
    styleUrls: ['./scene-2D-editor.component.css']
})
export class Scene2DEditorComponent
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
