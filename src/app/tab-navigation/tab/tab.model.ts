export { Tab, TabValueType }

import Engineer from "./../../engineer";

enum TabValueType
{
    Scene = 0,
    SpriteSet = 1,
    ImageCollection = 2,
    Material = 3,
    Script = 4
}
class Tab
{
    private _Text:string;
    private _Node:any;
    private _Type:TabValueType;
    private _TypeText:string;
    public get Text():string { return this._Text + this._TypeText; }
    public set Text(value:string) { this._Text = value; }
    public get Value():any { return this._Node.Value; }
    public set Value(value:any) { this._Node.Value = value; }
    public get Node():any { return this._Node; }
    public get Type():TabValueType { return this._Type; }
    public set Type(value:TabValueType) { this._Type = value; }
	constructor (Node:any, Type:TabValueType)
	{
        this._Text = Node.Name;
        this._Node = Node;
        this._Type = Type;
        if(this._Type == TabValueType.Scene) this._TypeText = " - Scene";
        else if(this._Type == TabValueType.SpriteSet) this._TypeText = " - SpriteSet";
        else if(this._Type == TabValueType.ImageCollection) this._TypeText = " - ImageCollection";
        else if(this._Type == TabValueType.Material) this._TypeText = " - Material";
        else if(this._Type == TabValueType.Script) this._TypeText = " - Script";
    }
    public CloseNodeValue()
    {
        if(this._Type == TabValueType.SpriteSet) return;
        else if(this._Type == TabValueType.ImageCollection) return;
        this._Node.Value = null;
    }
}