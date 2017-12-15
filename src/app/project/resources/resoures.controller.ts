export { ResourcesController, ResourceNode }

import Engineer from "./../../engineer";

class ResourcesController
{
    private _Node:any;
    private _SpriteSets:any;
    private _Textures:any;
    public get Textures():any { return this._Textures; }
    public get ResourcesNode():any { return this._Node; }
    public get SpriteSetsNode():any { return this._Node.Children[4]; }
    public get TexturesNode():any { return this._Node.Children[5]; }
    public constructor(ResourcesNode:any)
    {
        this._Node = ResourcesNode;
        this.Init();
    }
    private Init() : void
    {
        this.InitSpriteSets(this._Node.Children[4]);
        this.InitTextures(this._Node.Children[5]);
    }
    private InitSpriteSets(Node:any) : void
    {
        this._SpriteSets = {};
        for(let Element of Node.Children)
        {
            this._SpriteSets[Node.Children.Name] = new ResourceNode(Element.Path);
        }
    }
    private InitTextures(Node:any) : void
    {
        this._Textures = {};
        for(let Element of Node.Children)
        {
            this._Textures[Element.Name] = new ResourceNode(Element.Path);
        }
    }
    public AddSpriteSet(Name:string) : void
    {
        let Resource = [];
        let Node = this.CreateResource(Resource, Name, "SpriteSet", this.SpriteSetsNode.Path + "/" + Name + ".tsn");
        this.SpriteSetsNode.Children.push(Node);
        this._SpriteSets[Name] = new ResourceNode(this.SpriteSetsNode.Path + "/" + Name + ".tsn");
        this._SpriteSets[Name].Value = Resource;
        return Node;
    }
    private CreateResource(Resource:any, Name:string, Type:string, Path:string) : any
    {
        let Node = 
        {
            Name: Name + ".tsn",
            Type: "File",
            DataType: Type,
            Path: Path,
            Extension: "tsn",
            Value: Resource
        }
        return Node;
    }
}

class ResourceNode
{
    private _Path:string;
    private _Value:any;
    public get Path():any {return this._Path; }
    public get Value():any {return this._Value; }
    public set Value(value:any) { this._Value = value; }
    public constructor(Path:string)
    {
        this._Path = Path;
    }
}