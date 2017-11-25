import { Input, Component } from '@angular/core';

import { Tab, TabValueType } from "./tab/tab.model";

@Component(
{
    selector: 'tab-navigation',
    templateUrl: './tab-navigation.component.html',
    styleUrls: ['./tab-navigation.component.css']
})
export class TabNavigationComponent
{
    //@Input()
    private Tabs:Tab[];
    private ngOnInit() : void
    {
        this.Tabs = [];
        this.Tabs.push(new Tab("Example Scene", null, TabValueType.Scene));
    }
}
