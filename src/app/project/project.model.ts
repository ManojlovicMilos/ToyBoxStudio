export { Project }

import Engineer from "./../engineer";
import { ElectronService } from 'ngx-electron';

import { Tab, TabValueType } from "./../tab-navigation/tab/tab.model";
import { ResourcesController } from "./resources/resoures.controller";
import { resource } from "selenium-webdriver/http";

class Project
{
    private _Name:string;
    private _Tree:any;
    private _Electron:ElectronService;
    private _CurrentTab:Tab;
    private _OpenTabs:Tab[];
    private _Resources:ResourcesController;
    public get Name():string { return this._Name; }
    public get Tree():any { return this._Tree; }
    public get CurrentTab():Tab { return this._CurrentTab; }
    public get OpenTabs():Tab[] { return this._OpenTabs; }
    public get Assets():any { return this._Tree.Children[0]; }
    public get Scenes():any { return this.Assets.Children[1]; }
    public get SceneObjects():any { return this.Assets.Children[0]; }
    public get Value():any { return this._CurrentTab.Value; }
    public set Value(value:any) { this._CurrentTab.Value = value; }
    public get Resources():ResourcesController { return this._Resources; }
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
        this._Resources = new ResourcesController(this._Tree.Children[1]);
        this.LoadRequired();
        this._Resources.Init();
    }
    private LoadRequired() : void
    {
        for(let i in this._Resources.SpriteSetsNode.Children)
        {
            this.LoadFile(this._Resources.SpriteSetsNode.Children[i]);
        }
        for(let i in this._Resources.ImageCollectionsNode.Children)
        {
            this.LoadFile(this._Resources.ImageCollectionsNode.Children[i]);
        }
    }
    public SaveCurrent() : void
    {
        if(this._CurrentTab != null) this.SaveFile(this._CurrentTab.Node);
    }
    public SaveFile(Node) : void
    {
        if(Node.Value != null)
        {
            if(this._Electron.isElectronApp)
            {
                let Data = null;
                if(Node.DataType == "SpriteSet")
                {
                    Data = { Type: Node.DataType, Data: [] };
                    for(let i in Node.Value) Data.Data.push(Node.Value[i].Serialize());
                }
                else
                {
                    Data = { Type: Node.DataType, Data: Node.Value.Serialize() };
                }
                this._Electron.ipcRenderer.send("save-file", [Node.Path, Data]);
            }
        }
    }
    private CheckOpen(Node) : boolean
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
    private LoadFile(Node:any) : void
    {
        if(Node.Type != "File") return;
        if(this._Electron.isElectronApp)
        {
            let Data = this._Electron.ipcRenderer.sendSync("open-file", [Node.Path]);
            Node.DataType = Data.Type;
            let NewTab = null;
            if(Data.Type == "Scene")
            {
                let Scene = new Engineer.Engine.Scene2D();
                Scene.Deserialize(Data.Data);
                Node.Value = Scene;
            }
            else if(Data.Type == "SpriteSet")
            {
                let SpriteSet = [];
                for(let i in Data.Data)
                {
                    let Entry = new Engineer.Engine.SpriteSet();
                    Entry.Deserialize(Data.Data[i]);
                    SpriteSet.push(Entry);
                }
                Node.Value = SpriteSet;
            }
            else if(Data.Type == "ImageCollection")
            {
                let Entry = new Engineer.Engine.TileCollection();
                Entry.Deserialize(Data.Data);
                Node.Value = Entry;
            }
        }
    }
    public OpenFile(Node) : void
    {
        if(this.CheckOpen(Node)) return;
        if(Node.Type != "File") return;
        if(this._Electron.isElectronApp)
        {
            let Data = this._Electron.ipcRenderer.sendSync("open-file", [Node.Path]);
            Node.DataType = Data.Type;
            let NewTab = null;
            if(Data.Type == "Scene")
            {
                let Scene = new Engineer.Engine.Scene2D();
                Scene.Deserialize(Data.Data);
                Node.Value = Scene;
                NewTab = new Tab(Node, Node.Value, TabValueType.Scene);
            }
            else if(Data.Type == "SpriteSet")
            {
                let SpriteSet = [];
                for(let i in Data.Data)
                {
                    let Entry = new Engineer.Engine.SpriteSet();
                    Entry.Deserialize(Data.Data[i]);
                    SpriteSet.push(Entry);
                }
                Node.Value = SpriteSet;
                NewTab = new Tab(Node, Node.Value, TabValueType.SpriteSet);
            }
            else if(Data.Type == "ImageCollection")
            {
                let Entry = new Engineer.Engine.TileCollection();
                Entry.Deserialize(Data.Data);
                Node.Value = Entry;
                NewTab = new Tab(Node, Node.Value, TabValueType.TileCollection);
            }
            this._OpenTabs.push(NewTab);
            this._CurrentTab = NewTab;
        }
    }
    public SwitchTab(Tab:Tab) : void
    {
        this._CurrentTab = Tab;
    }
    public CreateScene(Name:string) : void
    {
        let Scene = new Engineer.Engine.Scene2D();
        Scene.Name = Name;
        Scene.BackColor = Engineer.Math.Color.Black;
        let Node = 
        {
            Name: Name,
            FileName: Name + ".tsn",
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
    public CreateSpriteSet(Name:string) : void
    {
        let Node:any = this._Resources.AddSpriteSet(Name);
        this.SaveFile(Node);
        let NewTab = new Tab(Node, Node.Value, TabValueType.SpriteSet);
        this._OpenTabs.push(NewTab);
        this._CurrentTab = NewTab;
    }
    public CreateImageCollection(Name:string) : void
    {
        let Node:any = this._Resources.AddImageCollection(Name);
        this.SaveFile(Node);
        let NewTab = new Tab(Node, Node.Value, TabValueType.TileCollection);
        this._OpenTabs.push(NewTab);
        this._CurrentTab = NewTab;
    }
}