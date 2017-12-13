import { Input, Component } from '@angular/core';

import { Project } from "./../project/project.model";
import { Tab, TabValueType } from "./tab/tab.model";

@Component(
{
    selector: 'tab-navigation',
    templateUrl: './tab-navigation.component.html',
    styleUrls: ['./tab-navigation.component.css']
})
export class TabNavigationComponent
{
    @Input() private Current:Project;
    private ngOnInit() : void
    {
        
    }
    private SwitchTab(Tab:Tab)
    {
        this.Current.SwitchTab(Tab);
    }
}
