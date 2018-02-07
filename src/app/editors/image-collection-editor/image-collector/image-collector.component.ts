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
    private _CurrentNode:any;
    private _AvailableFolders:any[];
    private _AvailableTextures:any[];
    public constructor(private Sanitizer:DomSanitizer) {}
    public ngOnInit() : void
    {
        this.LoadRootNode(this.Resources.TexturesNode);
    }
    private LoadRootNode(RootNode:any) : void
    {
        this._CurrentNode = RootNode;
        this._AvailableFolders = [];
        this._AvailableTextures = [];
        for(let i in RootNode.Children)
        {
            let Node = RootNode.Children[i];
            if(Node.Type == "Dir")
            {
                Node.Parent = RootNode;
                this._AvailableFolders.push(Node);
            }
            else if(Node.Type == "File" && (Node.Extension == ".png" || Node.Extension == ".jpg" || Node.Extension == ".jpeg"))
            {
                this._AvailableTextures.push(Node);
            }
        }
    }
    private SelectMember(ImagePath : string) : void
    {
        this._SelectedMember = ImagePath;
    }
    private SelectFolder(Node) : void
    {
        this.LoadRootNode(Node);
    }
    private SelectTexture(ImagePath : string) : void
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
