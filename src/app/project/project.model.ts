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
    public get Value():any { return this._CurrentTab.Value; }
    public set Value(value:any) { this._CurrentTab.Value = value; }
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
                let Data = 
                {
                    Type: Node.DataType,
                    Data: Node.Value.Serialize()
                }
                this._Electron.ipcRenderer.send("save-file", [Node.Path, Data]);
            }
        }
    }
    private CheckOpen(Node)
    {
        for(let i in this._OpenTabs)
        {
            if(this._OpenTabs[i].Node == Node)
            {
                this._CurrentTab = this._OpenTabs[i];
                return true;
            }
        }
        return false;
    }
    public OpenFile(Node)
    {
        if(this.CheckOpen(Node)) return;
        if(Node.Type != "File") return;
        if(this._Electron.isElectronApp)
        {
            let Data = this._Electron.ipcRenderer.sendSync("open-file", [Node.Path]);
            Node.DataType = Data.Type;
            if(Data.Type == "Scene")
            {
                let Scene = new Engineer.Engine.Scene2D();
                Scene.Deserialize(Data.Data);
                Node.Value = Scene;
                let NewTab = new Tab(Node, Node.Value, TabValueType.Scene);
                this._OpenTabs.push(NewTab);
                this._CurrentTab = NewTab;
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
            Type: "File",
            DataType: "Scene",
            Path: this.Scenes.Path + "/" + Name + ".tsn",
            Extension: "tsn",
            Value: Scene
        }
        this.Scenes.Children.push(Node);
        this.SaveFile(Node);
        let NewTab = new Tab(Node, Scene, TabValueType.Scene);
        this._OpenTabs.push(NewTab);
        this._CurrentTab = NewTab;
    }
    public SwitchTab(Tab:Tab)
    {
        this._CurrentTab = Tab;
    }
}