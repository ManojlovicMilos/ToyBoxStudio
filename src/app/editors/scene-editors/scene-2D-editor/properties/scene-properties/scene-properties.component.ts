import Engineer from "./../../../../../engineer";

import { Input, Component } from '@angular/core';

import { SceneContainer } from "./../../scene-2D-editor.model";
import { ModalController, ModalControllerType } from "./../../../../../general/modal/modal.controller";

@Component(
{
    selector: 'scene-properties',
    templateUrl: './scene-properties.component.html',
    styleUrls: ['./scene-properties.component.css']
})
export class ScenePropertiesComponent
{
    @Input() private Container:SceneContainer;
    private _Modal:ModalController;
    public constructor()
    {
        this._Modal = new ModalController()
    }
    private OpenDataEditor() : void
    {
        this._Modal.Big = true;
        this._Modal.Show("Data Collection", "Close", ModalControllerType.DataEditor, this.Container.Selected.Data);
    }
}
