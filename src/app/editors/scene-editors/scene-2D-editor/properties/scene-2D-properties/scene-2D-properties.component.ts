import Engineer from "./../../../../../engineer";

import { Input, Component } from '@angular/core';

import { SceneContainer } from "./../../scene-2D-editor.model";
import { ModalController, ModalControllerType } from "./../../../../../general/modal/modal.controller";

@Component(
{
    selector: 'scene-2D-properties',
    templateUrl: './scene-2D-properties.component.html',
    styleUrls: ['./scene-2D-properties.component.css']
})
export class Scene2DPropertiesComponent
{
    @Input() private Container:SceneContainer;
    public constructor() { }
}
