import { Input, Component } from '@angular/core';

import { SpriteSetContainer } from "./sprite-set-editor.model";
import { ResourcesController } from "./../../project/resources/resoures.controller";

@Component(
{
    selector: 'sprite-set-editor',
    templateUrl: './sprite-set-editor.component.html',
    styleUrls: ['./sprite-set-editor.component.css']
})
export class SpriteSetEditorComponent
{
    @Input() private SpriteSet:any;
    @Input() private Resources:ResourcesController;
    private _Model:SpriteSetContainer;
    public get Model():SpriteSetContainer { return this._Model; }
    public constructor() {}
    private ngOnInit() : void
    {
        this._Model = new SpriteSetContainer(this.SpriteSet, this.Resources);
    }
}
