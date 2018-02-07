export { ResourcesController, ResourceNode }

import Engineer from "./../../engineer";

class ResourcesController
{
    private _Node:any;
    private _SpriteSetsCollections:any;
    private _ImageCollections:any;
    private _Textures:any;
    public get SpriteSetsCollections():any { return this._SpriteSetsCollections; }
    public get ImageCollections():any { return this._ImageCollections; }
    public get Textures():any { return this._Textures; }
    public get ResourcesNode():any { return this._Node; }
    public get ImageCollectionsNode():any { return this.FindChild(this._Node, "ImageCollections"); }
    public get SpriteSetsNode():any { return this.FindChild(this._Node, "SpriteSets"); }
    public get TexturesNode():any { return this.FindChild(this._Node, "Textures"); }
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
        this._SpriteSetsCollections = {};
        for(let Element of Node.Children)
        {
            this._SpriteSetsCollections[Element.Name] = new ResourceNode(Element.Path);
            this._SpriteSetsCollections[Element.Name].Node = Element;
            this._SpriteSetsCollections[Element.Value.Origin] = this._SpriteSetsCollections[Element.Name];
        }
    }
    private InitImageCollections(Node:any) : void
    {
        this._ImageCollections = {};
        for(let Element of Node.Children)
        {
            this._ImageCollections[Element.Name] = new ResourceNode(Element.Path);
            this._ImageCollections[Element.Name].Node = Element;
            this._ImageCollections[Element.Value.Origin] = this._ImageCollections[Element.Name];
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
    public AddSpriteSetCollection(Name:string) : void
    {
        let Resource = new Engineer.SpriteSetCollection(null, []);
        let Node = this.CreateResource(Resource, Name, "SpriteSetCollection", this.SpriteSetsNode.Path + "/" + Name + ".tsn");
        this.SpriteSetsNode.Children.push(Node);
        this._SpriteSetsCollections[Name] = new ResourceNode(this.SpriteSetsNode.Path + "/" + Name + ".tsn");
        this._SpriteSetsCollections[Name].Node = Node;
        this._SpriteSetsCollections[Name].Name = Name;
        this._SpriteSetsCollections[Name].Value = Resource;
        this._SpriteSetsCollections[Resource.Origin] = this._SpriteSetsCollections[Name];
        return Node;
    }
    public AddImageCollection(Name:string) : void
    {
        let Resource = new Engineer.ImageCollection(null, []);
        let Node = this.CreateResource(Resource, Name, "ImageCollection", this.ImageCollectionsNode.Path + "/" + Name + ".tsn");
        this.ImageCollectionsNode.Children.push(Node);
        this._ImageCollections[Name] = new ResourceNode(this.ImageCollectionsNode.Path + "/" + Name + ".tsn");
        this._ImageCollections[Name].Node = Node;
        this._ImageCollections[Name].Name = Name;
        this._ImageCollections[Name].Value = Resource;
        this._ImageCollections[Resource.Origin] = this._ImageCollections[Name];
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
    private FindChild(Node:any, Name:string) : any
    {
        for(let i in Node.Children)
        {
            if(Node.Children[i].Name == Name) return Node.Children[i];
        }
        return null;
    }
}

class ResourceNode
{
    private _Name:string;
    private _Path:string;
    private _Node:any;
    public get Name():string {return this._Name; }
    public set Name(value:string) { this._Name = value; }
    public get Path():any {return this._Path; }
    public get Value():any {return this._Node.Value; }
    public set Value(value:any) { this._Node.Value = value; }
    public get Node():any { return this._Node; }
    public set Node(value:any) { this._Node = value; }
    public constructor(Path:string)
    {
        this._Path = Path;
    }
}