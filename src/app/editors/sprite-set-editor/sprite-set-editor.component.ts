import Engineer from "./../../engineer";

import { Input, Component } from '@angular/core';

import { SpriteSetCollectionContainer } from "./sprite-set-editor.model";
import { ResourcesController } from "./../../project/resources/resoures.controller";

@Component(
{
    selector: 'sprite-set-editor',
    templateUrl: './sprite-set-editor.component.html',
    styleUrls: ['./sprite-set-editor.component.css']
})
export class SpriteSetEditorComponent
{
    @Input() private SpriteSetCollection:Engineer.SpriteSetCollection;
    @Input() private Resources:ResourcesController;
    private _Model:SpriteSetCollectionContainer;
    public get Model():SpriteSetCollectionContainer { return this._Model; }
    public constructor() {}
    private ngOnInit() : void
    {
        this._Model = new SpriteSetCollectionContainer(this.SpriteSetCollection, this.Resources);
    }
}
