import Engineer from "./../../../engineer";

import { Input, Component } from '@angular/core';

import { SpriteSetContainer } from "./../sprite-set-editor.model";
import { ModalController } from "./../../../general/modal/modal.controller";

@Component(
{
    selector: 'sprite-set-list',
    templateUrl: './sprite-set-list.component.html',
    styleUrls: ['./sprite-set-list.component.css']
})
export class SpriteSetListComponent
{
    @Input() private Container:SpriteSetContainer;
    private _Modal:ModalController;
    public constructor() 
    {
        this._Modal = new ModalController();
    }
    private Select(Object)
    {
        this.Container.Selected = Object;
    }
    private AddSpriteSet()
    {
        this._Modal.Callback = this.AddSpriteSetComplete.bind(this);
        this._Modal.Show("New SpriteSet", "Create SpriteSet");
    }
    private AddSpriteSetComplete(Value)
    {
        this.Container.AddSpriteSet(Value);
    }
    private SpriteSetThumbnail(Sprite:any)
    {
        if(Sprite.Sprites.length == 0) return "./assets/icons/sprite-icon.png";
        else Sprite.Sprites[0];
    }
}
