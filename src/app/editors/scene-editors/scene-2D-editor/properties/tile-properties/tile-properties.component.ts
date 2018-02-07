import Engineer from "./../../../../../engineer";

import { Input, Component, OnChanges } from '@angular/core';

import { SceneContainer } from "./../../scene-2D-editor.model";

@Component(
{
    selector: 'tile-properties',
    templateUrl: './tile-properties.component.html',
    styleUrls: ['./tile-properties.component.css']
})
export class TilePropertiesComponent implements OnChanges
{
    @Input() private Container:SceneContainer;
    private _CurrentCollection:string;
    public constructor() {}
    public ngOnInit() : void
    {
        this.InitCollection();
    }
    public ngOnChanges() : void
    {
        console.log("!");
        this.InitCollection();
    }
    private InitCollection() : void
    {
        if(this.Container.Selected.Collection != null)
        {
            this._CurrentCollection = this.Container.Selected.Collection.Origin;
        }
        else this._CurrentCollection = "";
    }
    private UpdateCollection() : void
    {
        if(this._CurrentCollection != "" && this.Container.Resources.ImageCollections[this._CurrentCollection] != null)
        {
            let Value = this.Container.Resources.ImageCollections[this._CurrentCollection].Value;
            this.Container.Selected.Collection = Value;
            this.Container.Selected.Modified = true;
            if(this.Container.Selected.Collection.Images.length > 0) this.Container.Selected.Index = 0;
        }
    }
}
