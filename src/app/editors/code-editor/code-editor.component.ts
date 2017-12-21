import { Input, Component } from '@angular/core';

@Component(
{
    selector: 'code-editor',
    templateUrl: './code-editor.component.html',
    styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent
{
    @Input() private Code:string;
    private _EditorOptions:any;
    public constructor() 
    {
        this._EditorOptions  = {theme: 'vs-dark', language: 'javascript'};
    }
    private ngOnInit() : void {}
}
