export { Tab, TabValueType }

import Engineer from "./../../engineer";

enum TabValueType
{
    Scene = 0,
    SpriteSet = 1,
    TileCollection = 2,
    Material = 3
}
class Tab
{
    private _Text:string;
    private _Value:any;
    private _Node:any;
    private _Type:TabValueType;
    private _TypeText:string;
    public get Text():string { return this._Text + this._TypeText; }
    public set Text(value:string) { this._Text = value; }
    public get Value():any { return this._Value; }
    public set Value(value:any) { this._Value = value; }
    public get Node():any { return this._Node; }
    public get Type():TabValueType { return this._Type; }
    public set Type(value:TabValueType) { this._Type = value; }
	constructor (Node:any, Value:any, Type:TabValueType)
	{
        this._Text = Node.Name;
        this._Value = Value;
        this._Node = Node;
        this._Type = Type;
        if(this._Type == TabValueType.Scene) this._TypeText = " - Scene";
        else if(this._Type == TabValueType.SpriteSet) this._TypeText = " - SpriteSet";
        else if(this._Type == TabValueType.TileCollection) this._TypeText = " - TileCollection";
        else if(this._Type == TabValueType.Material) this._TypeText = " - Material";
    }
    public CloseNodeValue()
    {
        if(this._Type == TabValueType.SpriteSet) return;
        else if(this._Type == TabValueType.TileCollection) return;
        this._Node.Value = null;
    }
}