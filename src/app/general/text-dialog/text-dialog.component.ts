import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component(
{
    selector: 'text-dialog',
    templateUrl: './text-dialog.component.html',
    styleUrls: ['./text-dialog.component.css']
})
export class TextDialogComponent
{
    @Output() private OnComplete:any;
    private _Value:string;
    public constructor(public dialogRef: MatDialogRef<TextDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any)
    {
        this._Value = "Enter Value";
    }
    public ngOnInit() : void {}
    public Complete() : void 
    {
        //this.OnComplete.emit(this._Value);
    }
}
