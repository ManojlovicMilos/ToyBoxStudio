import Engineer from "./../../engineer";

import { Component, Input } from '@angular/core';

@Component(
{
    selector: 'tree-node',
    templateUrl: './tree-node.component.html',
    styleUrls: ['./tree-node.component.css']
})
export class TreeNodeComponent
{
    @Input() private Node:any;
    private _Expanded:boolean;
    public constructor()
    {
        this._Expanded = false;
    }
    public ngOnInit() : void {}
    public ToggleExpand() : void
    {
        this._Expanded = !this._Expanded;
    }
}
