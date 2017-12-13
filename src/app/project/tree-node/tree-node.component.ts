import Engineer from "./../../engineer";

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component(
{
    selector: 'tree-node',
    templateUrl: './tree-node.component.html',
    styleUrls: ['./tree-node.component.css']
})
export class TreeNodeComponent
{
    @Input() private Node:any;
    @Output() private Open:any;
    private _Expanded:boolean;
    public constructor()
    {
        this._Expanded = false;
        this.Open = new EventEmitter();
    }
    public ngOnInit() : void {}
    public ToggleExpand() : void
    {
        this._Expanded = !this._Expanded;
    }
    public CallOpen() : void
    {
        this.Open.emit(this.Node);
    }
    public PassOpen(Node) : void
    {
        this.Open.emit(Node);
    }
}
