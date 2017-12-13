import 'bootstrap/dist/css/bootstrap.css';
import { Component, NgZone } from '@angular/core';
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
  private _ModalShown:boolean;
  private _ModalTitle:string;
  private _ModalConfirm:string;
  private _ModalTextValue:string;
  private _ModalCallback:Function;
  private _Title:string;
  private _Current:Project;
  private _SideBarOption:number;
  public constructor(private _ElectronService: ElectronService, private _Zone:NgZone)
  {
    this._ModalShown = false;
    this._ModalTitle = "Dialog";
    this._ModalConfirm = "OK";
    this._Title = 'ToyBox Studio';
    this._SideBarOption = 0;
    this._Current = new Project(this._ElectronService);
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
    this._ModalCallback = this.AddSceneComplete.bind(this);
    this.ShowModal("New Scene", "Create Scene");
  }
  private AddSceneComplete(Value)
  {
    this._Current.CreateScene(Value);
  }
  private ShowModal(Title:string, Confirm:string)
  {
    this._ModalShown = true;
    this._ModalTitle = Title;
    this._ModalConfirm = Confirm;
  }
  private HideModal(Event)
  {
    this._ModalShown = false;
  }
  private ModalComplete(Result)
  {
    this._ModalShown = false;
    this._ModalCallback(Result);
  }
  private SelectOption(Option:number) : void
  {
    if(Option == this._SideBarOption) this._SideBarOption = -1;
    else this._SideBarOption = Option;
  }
}
