import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';

import { ModalController } from "./modal.controller";

@Component(
{
    selector: 'modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent
{
    @Input() private Controller:ModalController;
    public constructor() {}
    public ngOnInit() : void {}
    public Complete() : void 
    {
        this.Controller.Complete();
    }
}
