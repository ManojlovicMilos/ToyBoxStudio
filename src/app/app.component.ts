import 'bootstrap/dist/css/bootstrap.css';
import { Component, ChangeDetectorRef } from '@angular/core';
import { ElectronService } from 'ngx-electron';

import { Project } from "./project/project.model";

@Component(
{
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  private _Title:string;
  private _Current:Project;
  private _SideBarOption:number;
  public constructor(private _ElectronService: ElectronService, private Reference: ChangeDetectorRef)
  {
    this._Title = 'ToyBox Studio';
    this._SideBarOption = 0;
    this._Current = new Project();
  }
  public ngOnInit() : void
  {
    if(this._ElectronService.isElectronApp)
    {
        this._ElectronService.ipcRenderer.on('project-loaded' , this.ProjectLoaded.bind(this));
    }
  }
  private ProjectLoaded(Event, Data)
  {
      this._Current.Load(Data);
      //this.Reference.detach();
      //this.Reference.detectChanges();
  }
  private SelectOption(Option:number) : void
  {
    if(Option == this._SideBarOption) this._SideBarOption = -1;
    else this._SideBarOption = Option;
  }
}
