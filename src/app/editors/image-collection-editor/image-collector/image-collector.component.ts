import Engineer from "./../../../engineer";

import { Input, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ResourcesController } from "./../../../project/resources/resoures.controller";

@Component(
{
    selector: 'image-collector',
    templateUrl: './image-collector.component.html',
    styleUrls: ['./image-collector.component.css']
})
export class ImageCollectorComponent
{
    @Input() private ImageCollection:any;
    @Input() private Resources:any;
    private _SelectedMember:string;
    private _SelectedTexture:string;
    private _AvailableTextures:string[];
    public constructor(private Sanitizer:DomSanitizer) {}
    public ngOnInit() : void
    {
        this._AvailableTextures = [];
        for(let Element in this.Resources.Textures)
        {
            this._AvailableTextures.push(this.Resources.Textures[Element].Path);
        }
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
            this.ImageCollection.Images.push(this._SelectedTexture);
        }
    }
    private RemoveTexture() : void
    {
        if(this._SelectedMember != null)
        {
            this.ImageCollection.Images.splice(this.ImageCollection.Images.indexOf(this._SelectedMember), 1);
            this._SelectedMember = null;
        }
    }
    private Sanitize(Url:string)
    {
        return this.Sanitizer.bypassSecurityTrustResourceUrl(Url);
    }
}
