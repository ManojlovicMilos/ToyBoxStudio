import Engineer from "./../../../../engineer";

import { Input, Component } from '@angular/core';

import { SceneContainer } from "./../scene-2D-editor.model";

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
    public constructor()
    {
        this._Game = new Engineer.Game();
        this._Game.Name = "ToyBox Studio";
    }
    private ngOnInit() : void
    {
        this._Canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this._Canvas.addEventListener("resize", this.Resize.bind(this));
        this.Container.Scene.Data["EDITOR_GRID"] = "Classic";
        this._Game.AddScene(this.Container.Scene);
        this._Runner = new Engineer.Runner(this._Game, Engineer.DrawEngineType.ThreeJS);
        this._Runner.SetResolution(new Engineer.Vertex(this._Canvas.width, this._Canvas.height, 0), true);
        this._Runner.SwitchScene(this.Container.Scene.Name);
        this._Runner.Run();
    }
    private Resize() : void
    {
        this._Runner.SetResolution(new Engineer.Vertex(this._Canvas.width, this._Canvas.height, 0), true);
    }
}
