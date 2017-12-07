export { Project }

import Engineer from "./../engineer";

class Project
{
    private _Name:string;
    private _Tree:any;
    public get Name():string { return this._Name; }
    public get Tree():any { return this._Tree; }
	public constructor ()
	{
        this._Name = "";
        this._Tree = null;
    }
    public Load(DirTree) : void
    {
        this._Name = DirTree.Name;
        this._Tree = DirTree;
    }
}