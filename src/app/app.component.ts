import 'bootstrap/dist/css/bootstrap.css';

import { Component } from '@angular/core';

import { Project } from "./project/project.model";

@Component(
{
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  private _Current:Project;
  private _Title:string;
  private _SideBarOption:number;
  public constructor()
  {
    this._Title = 'ToyBox Studio';
    this._SideBarOption = 0;
  }
  private SelectOption(Option:number) : void
  {
    if(Option == this._SideBarOption) this._SideBarOption = -1;
    else this._SideBarOption = Option;
  }
}
