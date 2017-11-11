import Engineer from "./../../engineer";
import { Component } from '@angular/core';

import { SceneObjectManager, SceneObjectManagerItem } from "./objects.model";

@Component(
{
    selector: 'objects',
    templateUrl: './objects.component.html',
    styleUrls: ['./objects.component.css']
})
export class ObjectsComponent
{
    private _Model:SceneObjectManager;
    public get Model():SceneObjectManager { return this._Model; }
    public constructor()
    {
        this._Model = new SceneObjectManager();
        this._Model.AddItem("Sprite", new Engineer.Engine.Sprite(), ["SceneObject", "Sprite"]);
        this._Model.AddItem("Tile", new Engineer.Engine.Tile(), ["SceneObject", "Tile"]);
        this._Model.ApplyFilter("All");
    }
    public ApplyFilter(Tag:string) : void
    {
        this._Model.ApplyFilter(Tag);
    }
    public ngOnInit() : void
    {

    }
}
