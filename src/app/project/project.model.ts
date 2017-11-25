export { Project }

import Engineer from "./../engineer";

class PathNode
{
    private _Name:string;
    private _Object:any;
    private _Children:PathNode[];
}
class Project
{
    private _Text:string;
    private _Value:any;
    private _Type:TabValueType;
    public get Text():string { return this._Text; }
    public set Text(value:string) { this._Text = value; }
    public get Value():any { return this._Value; }
    public set Value(value:any) { this._Value = value; }
    public get Type():TabValueType { return this._Type; }
    public set Type(value:TabValueType) { this._Type = value; }
	constructor (Text:string, Value:any, Type:TabValueType)
	{
        this._Text = Text;
        this._Value = Value;
        this._Type = Type;
    }
}