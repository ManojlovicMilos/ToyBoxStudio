import Engineer from "./../../../engineer";

import { Input, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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
    public constructor(private Sanitizer:DomSanitizer)
    {
        this._Modal = new ModalController();
    }
    private Select(Object) : void
    {
        this.Container.Selected = Object;
    }
    private AddSpriteSet() : void
    {
        this._Modal.Callback = this.AddSpriteSetComplete.bind(this);
        this._Modal.Show("New SpriteSet", "Create SpriteSet");
    }
    private AddSpriteSetComplete(Value) : void
    {
        this.Container.AddSpriteSet(Value);
    }
    private RemoveSpriteSet() : void
    {
        if(this.Container.Selected != null)
        {
            this.Container.RemoveSpriteSet(this.Container.Selected);
            this.Container.Selected = null;
        }
    }
    private SpriteSetThumbnail(Sprite:any) : string
    {
        if(Sprite.Sprites.length == 0) return "./assets/icons/sprite-icon.png";
        else return Sprite.Sprites[0];
    }
    private Sanitize(Url:string)
    {
        return this.Sanitizer.bypassSecurityTrustResourceUrl(Url);
    }
}
