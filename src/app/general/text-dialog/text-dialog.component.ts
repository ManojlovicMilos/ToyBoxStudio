import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';

@Component(
{
    selector: 'text-dialog',
    templateUrl: './text-dialog.component.html',
    styleUrls: ['./text-dialog.component.css']
})
export class TextDialogComponent
{
    @Input() private Title:string;
    @Input() private Confirm:string;
    @Output() private OnComplete:any;
    private _Value:string;
    public constructor()
    {
        this._Value = "Enter Value";
        this.OnComplete = new EventEmitter();
    }
    public ngOnInit() : void {}
    public Complete() : void 
    {
        this.OnComplete.emit(this._Value);
    }
}
