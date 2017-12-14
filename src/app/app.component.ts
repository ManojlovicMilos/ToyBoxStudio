import 'bootstrap/dist/css/bootstrap.css';
import { Component, NgZone } from '@angular/core';
import { ElectronService } from 'ngx-electron';

import { Project } from "./project/project.model";
import { ModalController } from "./general/modal/modal.controller";

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
  private _Modal:ModalController;
  public constructor(private _ElectronService: ElectronService, private _Zone:NgZone)
  {
    this._Title = 'ToyBox Studio';
    this._SideBarOption = 0;
    this._Current = new Project(this._ElectronService);
    this._Modal = new ModalController();
  }
  public ngOnInit() : void
  {
    if(this._ElectronService.isElectronApp)
    {
        this._ElectronService.ipcRenderer.on('project-loaded' , this.ProjectLoadedHandler.bind(this));
        this._ElectronService.ipcRenderer.on('add-scene' , this.AddSceneHandler.bind(this));
    }
  }
  private ProjectLoadedHandler(Event, Data) { this._Zone.run(function() { this.ProjectLoaded(Data) }.bind(this));}
  private AddSceneHandler(Event, Data) { this._Zone.run(this.AddScene.bind(this)); }
  private ProjectLoaded(Data)
  {
    this._Current.Load(Data);
  }
  private AddScene()
  {
    this._Modal.Callback = this.AddSceneComplete.bind(this);
    this._Modal.Show("New Scene", "Create Scene");
  }
  private AddSceneComplete(Value)
  {
    this._Current.CreateScene(Value);
  }
  
  private SelectOption(Option:number) : void
  {
    if(Option == this._SideBarOption) this._SideBarOption = -1;
    else this._SideBarOption = Option;
  }
}
