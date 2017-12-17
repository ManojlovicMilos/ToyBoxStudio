import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component(
{
    selector: 'data-editor',
    templateUrl: './data-editor.component.html',
    styleUrls: ['./data-editor.component.css']
})
export class DataEditorComponent
{
    @Input() private Title:string;
    @Input() private Confirm:string;
    @Input() private Value:any;
    @Output() private OnComplete:any;
    private _NewKey:string;
    private _NewValueType:string;
    private _Keys:string[];
    public constructor()
    {
        this._NewKey = "NewKey";
        this._NewValueType = "String";
        this.OnComplete = new EventEmitter();
    }
    public ngOnInit() : void 
    {
        this._Keys = Object.keys(this.Value);
    }
    public Complete() : void 
    {
        this.OnComplete.emit(this.Value);
    }
    private Type(Value:any) : string
    {
        if(typeof Value == "number") return "Number";
        if(typeof Value == "string") return "String";
        if(typeof Value == "boolean") return "Boolean";
        return "Other";
    }
    private Delete(Key:string) : void
    {
        delete this.Value[Key];
        this._Keys.splice(this._Keys.indexOf(Key), 1);
    }
    private AddKey() : void
    {
        if(this._NewValueType == "String") this.Value[this._NewKey] = "";
        if(this._NewValueType == "Number") this.Value[this._NewKey] = 0;
        if(this._NewValueType == "Boolean") this.Value[this._NewKey] = false;
        this._Keys.push(this._NewKey);
    }
}
