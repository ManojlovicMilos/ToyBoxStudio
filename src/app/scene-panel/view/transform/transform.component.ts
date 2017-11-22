import { Input, Component } from '@angular/core';

import { SceneContainer } from "./../../scene-panel.model";
import { TransformController } from "./transform.controller";

@Component(
{
    selector: 'transform',
    templateUrl: './transform.component.html',
    styleUrls: ['./transform.component.css']
})
export class TransformComponent
{
    @Input() private Container:SceneContainer;
    private _Transform:TransformController;
    private ngOnInit() : void
    {
        this._Transform = new TransformController(this.Container);
    }
}
