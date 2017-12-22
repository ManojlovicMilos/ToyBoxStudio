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
        this._ElectronService.ipcRenderer.on('save-current-file' , this.SaveFileHandler.bind(this));
        this._ElectronService.ipcRenderer.on('add-script' , this.AddScriptHandler.bind(this));
        this._ElectronService.ipcRenderer.on('add-scene' , this.AddSceneHandler.bind(this));
        this._ElectronService.ipcRenderer.on('add-sprite-set' , this.AddSpriteSetHandler.bind(this));
        this._ElectronService.ipcRenderer.on('add-image-collection' , this.AddImageCollectionHandler.bind(this));
        this._ElectronService.ipcRenderer.on('edit-copy' , this.Copy.bind(this));
        this._ElectronService.ipcRenderer.on('edit-paste' , this.Paste.bind(this));
    }
  }
  private ProjectLoadedHandler(Event, Data) { this._Zone.run(function() { this.ProjectLoaded(Data) }.bind(this));}
  private SaveFileHandler(Event) { this._Zone.run(this.SaveFile.bind(this)); }
  private AddScriptHandler(Event) { this._Zone.run(this.AddScript.bind(this)); }
  private AddSceneHandler(Event) { this._Zone.run(this.AddScene.bind(this)); }
  private AddSpriteSetHandler(Event) { this._Zone.run(this.AddSpriteSet.bind(this)); }
  private AddImageCollectionHandler(Event) { this._Zone.run(this.AddImageCollection.bind(this)); }
  private ProjectLoaded(Data) : void
  {
    this._Current.Load(Data);
  }
  private SaveFile() : void
  {
    this._Current.SaveCurrent();
  }
  private AddScript() : void
  {
    this._Modal.Callback = this.AddScriptComplete.bind(this);
    this._Modal.Show("New Script", "Create Script");
  }
  private AddScene() : void
  {
    this._Modal.Callback = this.AddSceneComplete.bind(this);
    this._Modal.Show("New Scene", "Create Scene");
  }
  private AddSpriteSet() : void
  {
    this._Modal.Callback = this.AddSpriteSetComplete.bind(this);
    this._Modal.Show("New SpriteSet", "Create SpriteSet");
  }
  private AddImageCollection() : void
  {
    this._Modal.Callback = this.AddImageCollectionComplete.bind(this);
    this._Modal.Show("New ImageColleciton", "Create ImageCollection");
  }
  private AddScriptComplete(Value) : void
  {
    this._Current.CreateScript(Value);
  }
  private AddSceneComplete(Value) : void
  {
    this._Current.CreateScene(Value);
  }
  private AddSpriteSetComplete(Value) : void
  {
    this._Current.CreateSpriteSet(Value);
  }
  private AddImageCollectionComplete(Value) : void
  {
    this._Current.CreateImageCollection(Value);
  }
  private SelectOption(Option:number) : void
  {
    if(Option == this._SideBarOption) this._SideBarOption = -1;
    else this._SideBarOption = Option;
  }
  private Copy() : void
  {

  }
  private Paste() : void
  {
    
  }
}
