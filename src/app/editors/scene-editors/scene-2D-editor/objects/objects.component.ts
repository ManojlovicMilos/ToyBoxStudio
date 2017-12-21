import Engineer from "./../../../../engineer";
import { Input, Component } from '@angular/core';

import { SceneContainer } from "./../scene-2D-editor.model";
import { SceneObjectManager, SceneObjectManagerItem } from "./objects.model";

@Component(
{
    selector: 'objects',
    templateUrl: './objects.component.html',
    styleUrls: ['./objects.component.css']
})
export class ObjectsComponent
{
    @Input() private Container:SceneContainer;
    private _Model:SceneObjectManager;
    public get Model():SceneObjectManager { return this._Model; }
    public constructor()
    {
        this._Model = new SceneObjectManager();

        let NewSprite = new Engineer.Sprite();
        NewSprite.Name = "New Sprite";
        NewSprite.Trans.Scale = new Engineer.Vertex(100,100,100);
        NewSprite.Paint = Engineer.Color.FromRGBA(255, 255, 255, 255);
        this._Model.AddItem("Sprite", NewSprite, ["SceneObject", "Sprite"], "./assets/icons/sprite-icon.png");

        let NewTile = new Engineer.Tile();
        NewTile.Name = "New Tile";
        NewTile.Trans.Scale = new Engineer.Vertex(100,100,100);
        NewTile.Paint = Engineer.Color.FromRGBA(255, 255, 255, 255);
        this._Model.AddItem("Tile", NewTile, ["SceneObject", "Tile"], "./assets/icons/tile-icon.png");
        
        this._Model.ApplyFilter("All");
    }
    public ApplyFilter(Tag:string) : void
    {
        this._Model.ApplyFilter(Tag);
    }
    public ApplyItem(Item:SceneObjectManagerItem) : void
    {
        Item.Apply(this.Container.Scene);
        this.Container.InvokeUpdate();
    }
}
