import Engineer from "./../../engineer";

import { Input, Component } from '@angular/core';

import { SceneContainer } from "./../scene-panel.model";
import { TransformController } from "./transform.controller";

@Component(
{
    selector: 'view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.css']
})
export class ViewComponent
{
    @Input() private Container:SceneContainer;
    private _Game:any;
    private _Runner:any;
    private _Canvas:HTMLCanvasElement;
    private _Transform:TransformController;
    public constructor()
    {
        this._Game = new Engineer.Engine.Game();
        this._Game.Name = "ToyBoxStudio";
    }
    private ngOnInit() : void
    {
        this._Canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this._Canvas.addEventListener("resize", this.Resize.bind(this));
        this._Game.AddScene(this.Container.Scene);
        this._Runner = new Engineer.Runner.Runner(this._Game, Engineer.Draw.DrawEngineType.ThreeJS);
        this._Runner.SetResolution(new Engineer.Math.Vertex(this._Canvas.width, this._Canvas.height));
        this._Runner.SwitchScene("Current");
        this._Runner.Run();
        this._Transform = new TransformController(this.Container);
    }
    private Resize() : void
    {
        this._Runner.SetResolution(new Engineer.Math.Vertex(this._Canvas.width, this._Canvas.height));
    }
}
