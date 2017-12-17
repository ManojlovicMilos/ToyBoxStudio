export { ResourcesController, ResourceNode }

import Engineer from "./../../engineer";

class ResourcesController
{
    private _Node:any;
    private _SpriteSets:any;
    private _ImageCollections:any;
    private _Textures:any;
    public get SpriteSets():any { return this._SpriteSets; }
    public get ImageCollections():any { return this._ImageCollections; }
    public get Textures():any { return this._Textures; }
    public get ResourcesNode():any { return this._Node; }
    public get ImageCollectionsNode():any { return this._Node.Children[0]; }
    public get SpriteSetsNode():any { return this._Node.Children[4]; }
    public get TexturesNode():any { return this._Node.Children[5]; }
    public constructor(ResourcesNode:any)
    {
        this._Node = ResourcesNode;
    }
    public Init() : void
    {
        this.InitSpriteSets(this._Node.Children[4]);
        this.InitImageCollections(this._Node.Children[0]);
        this.InitTextures(this._Node.Children[5]);
    }
    private InitSpriteSets(Node:any) : void
    {
        this._SpriteSets = {};
        for(let Element of Node.Children)
        {
            this._SpriteSets[Element.Name] = new ResourceNode(Element.Path);
            this._SpriteSets[Element.Name].Value = Element.Value;
        }
    }
    private InitImageCollections(Node:any) : void
    {
        this._ImageCollections = {};
        for(let Element of Node.Children)
        {
            this._ImageCollections[Element.Name] = new ResourceNode(Element.Path);
            this._ImageCollections[Element.Name].Value = Element.Value;
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
    public AddImageCollection(Name:string) : void
    {
        let Resource = new Engineer.Engine.TileCollection(null, []);
        let Node = this.CreateResource(Resource, Name, "ImageCollection", this.ImageCollectionsNode.Path + "/" + Name + ".tsn");
        this.ImageCollectionsNode.Children.push(Node);
        this._ImageCollections[Name] = new ResourceNode(this.ImageCollectionsNode.Path + "/" + Name + ".tsn");
        this._ImageCollections[Name].Value = Resource;
        return Node;
    }
    private CreateResource(Resource:any, Name:string, Type:string, Path:string) : any
    {
        let Node = 
        {
            Name: Name,
            FileName: Name + ".tsn",
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