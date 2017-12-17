import { Input, Component } from '@angular/core';

import { ImageCollectionContainer } from "./image-collection-editor.model";
import { ResourcesController } from "./../../project/resources/resoures.controller";

@Component(
{
    selector: 'image-collection-editor',
    templateUrl: './image-collection-editor.component.html',
    styleUrls: ['./image-collection-editor.component.css']
})
export class ImageCollectionEditorComponent
{
    @Input() private ImageCollection:any;
    @Input() private Resources:ResourcesController;
    private _Model:ImageCollectionContainer;
    public get Model():ImageCollectionContainer { return this._Model; }
    public constructor() {}
    private ngOnInit() : void
    {
        this._Model = new ImageCollectionContainer(this.ImageCollection, this.Resources);
    }
}
