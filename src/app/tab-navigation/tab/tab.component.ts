import { Input, Output, Component, EventEmitter } from '@angular/core';
import { Tab } from "./tab.model";

@Component(
{
    selector: 'tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.css']
})
export class TabComponent
{
    @Input() private Tab:Tab;
    @Input() private Current:boolean;
    @Output() private OnSwitch:any;
    @Output() private OnClose:any;
    public constructor()
    {
        this.OnSwitch = new EventEmitter();
        this.OnClose = new EventEmitter();
    }
    private ngOnInit() : void {}
    private Switch()
    {
        this.OnSwitch.emit(this.Tab);
    }
    private Close()
    {
        this.OnClose.emit(this.Tab);
    }
}
