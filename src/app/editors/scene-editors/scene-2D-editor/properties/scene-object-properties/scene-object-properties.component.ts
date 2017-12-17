import Engineer from "./../../../../../engineer";

import { Input, Component } from '@angular/core';

import { SceneContainer } from "./../../scene-2D-editor.model";
import { ModalController, ModalControllerType } from "./../../../../../general/modal/modal.controller";
import { Container } from "@angular/compiler/src/i18n/i18n_ast";

@Component(
{
    selector: 'scene-object-properties',
    templateUrl: './scene-object-properties.component.html',
    styleUrls: ['./scene-object-properties.component.css']
})
export class SceneObjectPropertiesComponent
{
    @Input() private Container:SceneContainer;
    private _Modal:ModalController;
    public constructor()
    {
        this._Modal = new ModalController();
    }
    private OpenDataEditor() : void
    {
        this._Modal.Big = true;
        this._Modal.Show("Data Collection", "Close", ModalControllerType.DataEditor, this.Container.Selected.Data);
    }
}
