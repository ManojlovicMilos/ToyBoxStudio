import Engineer from "./../engineer";

import { Component, Input } from '@angular/core';

import { Project } from "./project.model";

@Component(
{
    selector: 'project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css']
})
export class ProjectComponent
{
    @Input() private Current:Project;
    public constructor() {}
    public ngOnInit() : void
    {
    }
}
