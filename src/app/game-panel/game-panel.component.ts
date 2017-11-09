import Engineer from "./../engineer";

import { Component } from '@angular/core';

@Component(
{
    selector: 'game-panel',
    templateUrl: './game-panel.component.html',
    styleUrls: ['./game-panel.component.css']
})
export class GamePanelComponent
{
    private _Game:any;
    public get Game():any { return this._Game; }
    public constructor()
    {
        this._Game = new Engineer.Engine.Game("New Game");
    }
    public ngOnInit() : void
    {

    }
}
