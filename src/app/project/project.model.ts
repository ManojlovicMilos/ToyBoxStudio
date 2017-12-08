export { Project }

import Engineer from "./../engineer";
import { ElectronService } from 'ngx-electron';

import { Tab, TabValueType } from "./../tab-navigation/tab/tab.model";

class Project
{
    private _Name:string;
    private _Tree:any;
    private _Electron:ElectronService;
    private _CurrentTab:Tab;
    private _OpenTabs:Tab[];
    public get Name():string { return this._Name; }
    public get Tree():any { return this._Tree; }
    public get CurrentTab():Tab { return this._CurrentTab; }
    public get OpenTabs():Tab[] { return this._OpenTabs; }
    public get Assets():any { return this._Tree.Children[0]; }
    public get Scenes():any { return this.Assets.Children[1]; }
    public get SceneObjects():any { return this.Assets.Children[0]; }
	public constructor (ElectronService: ElectronService)
	{
        this._Name = "";
        this._Tree = null;
        this._CurrentTab = null;
        this._OpenTabs = [];
        this._Electron = ElectronService;
    }
    public Load(DirTree) : void
    {
        this._Name = DirTree.Name;
        this._Tree = DirTree;
    }
    public SaveFile(Node)
    {
        if(Node.Value != null)
        {
            if(this._Electron.isElectronApp)
            {
                this._Electron.ipcRenderer.send("save-file", [Node.Path, Node.Value.Serialize()]);
            }
        }
    }
    public CreateScene(Name:string)
    {
        let Scene = new Engineer.Engine.Scene2D();
        Scene.Name = Name;
        Scene.BackColor = Engineer.Math.Color.Black;
        let Node = 
        {
            Name: Name + ".tsn",
            Path: this.Scenes.Path + "/" + Name + ".tsn",
            Extension: "tsn",
            Value: Scene
        }
        this.Scenes.Children.push(Node);
        this.SaveFile(Node);
        let NewTab = new Tab(Name, Scene, TabValueType.Scene);
        this._OpenTabs.push(NewTab);
        this._CurrentTab = NewTab;
    }
}