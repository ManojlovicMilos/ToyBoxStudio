import Engineer from "./../../../engineer";

import { Input, Component } from '@angular/core';

import { ResourcesController } from "./../../../project/resources/resoures.controller";

@Component(
{
    selector: 'sprite-collector',
    templateUrl: './sprite-collector.component.html',
    styleUrls: ['./sprite-collector.component.css']
})
export class SpriteCollectorComponent
{
    @Input() private SpriteSet:any;
    @Input() private Resources:any;
    private _SelectedMember:string;
    private _SelectedTexture:string;
    private _AvailableTextures:string[];
    public constructor() {}
    public ngOnInit() : void
    {
        this._AvailableTextures = [];
        for(let Element in this.Resources.Textures)
        {
            this._AvailableTextures.push(this.Resources.Textures[Element].Path);
        }
        console.log(this._AvailableTextures);
    }
    private SelectMember(ImagePath) : void
    {
        this._SelectedMember = ImagePath;
    }
    private SelectTexture(ImagePath) : void
    {
        this._SelectedTexture = ImagePath;
    }
    private AddTexture() : void
    {
        if(this._SelectedTexture != null)
        {
            this.SpriteSet.Sprites.push(this._SelectedTexture);
        }
        console.log(this.SpriteSet);
    }
}
