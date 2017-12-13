import { Input, Component } from '@angular/core';

import { SpriteSetContainer } from "./sprite-set-editor.model";

@Component(
{
    selector: 'sprite-set-editor',
    templateUrl: './sprite-set-editor.component.html',
    styleUrls: ['./sprite-set-editor.component.css']
})
export class SpriteSetEditorComponent
{
    @Input() private SpriteSet:any;
    private _Model:SpriteSetContainer;
    public get Model():SpriteSetContainer { return this._Model; }
    public constructor() {}
    private ngOnInit() : void
    {
        this._Model = new SpriteSetContainer(this.SpriteSet);
    }
}
