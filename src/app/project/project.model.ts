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
    public get Assets():any { return this.FindChild(this._Tree, "Assets"); }
    public get Scenes():any { return this.FindChild(this.Assets, "Scenes"); }
    public get SceneObjects():any { return this.FindChild(this.Assets, "SceneObjects"); }
    public get Codes():any { return this.FindChild(this._Tree, "Code"); }
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
        this.IgnoreNodes(DirTree, ["node_modules","build","tscompiled","package","package-lock","tsconfig","webpack.config",".git",".gitignore","README","README.md"]);
        for(let i in this._OpenTabs)
        {
            this.CloseTab(this._OpenTabs[i]);
        }
        this._Name = DirTree.Name;
        this._Tree = DirTree;
        this._Resources = new ResourcesController(this.FindChild(this._Tree, "Resources"));
        this.LoadRequired();
        this._Resources.Init();
    }
    private IgnoreNodes(Tree:any, Ignored:string[])
    {
        for(let i in Ignored)
        {
            let Ignore = this.FindChild(Tree, Ignored[i]);
            if(Ignore)
            {
                Tree.Children.splice(Tree.Children.indexOf(Ignore), 1);
            }
        }
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
                Data = { Type: Node.DataType, Data: Node.Value.Serialize() };
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
                let Scene = new Engineer.Scene2D();
                Scene.Deserialize(Data.Data);
                Node.Value = Scene;
            }
            else if(Data.Type == "SpriteSetCollection")
            {
                let SpriteSet = new Engineer.SpriteSetCollection();
                SpriteSet.Deserialize(Data.Data);
                Node.Value = SpriteSet;
            }
            else if(Data.Type == "ImageCollection")
            {
                let Entry = new Engineer.ImageCollection();
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
            if(Node.Extension == ".ts" || Node.Extension == ".js" || Node.Extension == ".json" ||
                Node.Extension == ".html" || Node.Extension == ".css")
            {
                let Format = "";
                if(Node.Extension == ".ts") Format = "typescript";
                else if(Node.Extension == ".jts") Format = "javascript";
                else if(Node.Extension == ".json") Format = "json";
                else if(Node.Extension == ".html") Format = "html";
                else if(Node.Extension == ".css") Format = "css";
                let Data = this._Electron.ipcRenderer.sendSync("open-text-file", [Node.Path]);
                Node.DataType = "Script";
                Node.Value = {Format:Format, Data:Data};
                let NewTab = new Tab(Node, TabValueType.Script);
                this._OpenTabs.push(NewTab);
                this._CurrentTab = NewTab;
            }
            else if(Node.Extension == ".png" || Node.Extension == ".jpg" || Node.Extension == ".jpeg")
            {
                Node.DataType = "Image";
                Node.Value = Node.Path;
                let NewTab = new Tab(Node, TabValueType.Image);
                this._OpenTabs.push(NewTab);
                this._CurrentTab = NewTab;
            }
            else if(Node.Extension == ".tsn")
            {
                let Data = this._Electron.ipcRenderer.sendSync("open-file", [Node.Path]);
                Node.DataType = Data.Type;
                let NewTab = null;
                if(Data.Type == "Scene")
                {
                    let Scene = new Engineer.Scene2D();
                    Scene.Deserialize(Data.Data);
                    Node.Value = Scene;
                    NewTab = new Tab(Node, TabValueType.Scene);
                }
                else if(Data.Type == "SpriteSetCollection")
                {
                    let SpriteSetCollection = new Engineer.SpriteSetCollection();
                    SpriteSetCollection.Deserialize(Data.Data);
                    Node.Value = SpriteSetCollection;
                    NewTab = new Tab(Node, TabValueType.SpriteSet);
                }
                else if(Data.Type == "ImageCollection")
                {
                    let Entry = new Engineer.ImageCollection();
                    Entry.Deserialize(Data.Data);
                    Node.Value = Entry;
                    NewTab = new Tab(Node, TabValueType.ImageCollection);
                }
                this._OpenTabs.push(NewTab);
                this._CurrentTab = NewTab;
            }
        }
    }
    public SwitchTab(Tab:Tab) : void
    {
        this._CurrentTab = Tab;
    }
    public CloseTab(Tab:Tab) : void
    {
        if(Tab == this._CurrentTab) this._CurrentTab = null;
        this._OpenTabs.splice(this._OpenTabs.indexOf(Tab), 1);
        if(this._CurrentTab == null && this._OpenTabs.length > 0) this._CurrentTab = this._OpenTabs[0];
        Tab.CloseNodeValue();
        Tab = null;
    }
    public CreateScript(Name:string) : void
    {
        let Script = 
        `export { ` + Name + ` };
        
        import Engineer from "./Engineer";
        
        class `+Name+`
        {
            public constructor()
            {
                this.Init()
            }
            public Init() : void
            {
            }
        }`;
        let Node = 
        {
            Name: Name,
            FileName: Name + ".ts",
            Type: "File",
            DataType: "Script",
            Path: this.Codes.Path + "/" + Name + ".tsn",
            Extension: "ts",
            Value: Script
        }
        this.Codes.Children.push(Node);
        this.SaveFile(Node);
        let NewTab = new Tab(Node, TabValueType.Script);
        this._OpenTabs.push(NewTab);
        this._CurrentTab = NewTab;
    }
    public CreateScene(Name:string) : void
    {
        let Scene = new Engineer.Scene2D();
        Scene.Name = Name;
        Scene.BackColor = Engineer.Color.Black;
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
        let NewTab = new Tab(Node, TabValueType.Scene);
        this._OpenTabs.push(NewTab);
        this._CurrentTab = NewTab;
    }
    public CreateSpriteSetCollection(Name:string) : void
    {
        let Node:any = this._Resources.AddSpriteSetCollection(Name);
        this.SaveFile(Node);
        let NewTab = new Tab(Node, TabValueType.SpriteSet);
        this._OpenTabs.push(NewTab);
        this._CurrentTab = NewTab;
    }
    public CreateImageCollection(Name:string) : void
    {
        let Node:any = this._Resources.AddImageCollection(Name);
        this.SaveFile(Node);
        let NewTab = new Tab(Node, TabValueType.ImageCollection);
        this._OpenTabs.push(NewTab);
        this._CurrentTab = NewTab;
    }
    private FindChild(Node:any, Name:string) : any
    {
        for(let i in Node.Children)
        {
            if(Node.Children[i].Name == Name) return Node.Children[i];
        }
        return null;
    }
}