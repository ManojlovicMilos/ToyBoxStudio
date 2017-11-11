export { SceneObjectManager, SceneObjectManagerItem }

class SceneObjectManager
{
    private _Filters:string[];
    private _Items:SceneObjectManagerItem[];
    private _FilteredItems:SceneObjectManagerItem[];
    public get Filters():string[] { return this._Filters; }
    public get Items():SceneObjectManagerItem[] { return this._FilteredItems; }
	constructor ()
	{
        this._Filters = [];
        this._Items = [];
        this._Filters.push("All");
        this._FilteredItems = [];
    }
    public AddItem(Name:string, Object:any, Tags?:string[])
    {
        let NewItem = new SceneObjectManagerItem(Name, Object, Tags);
        NewItem.Tags.push("All");
        this._Items.push(NewItem);
        if(Tags)
        {
            for(let i in Tags)
            {
                if(this._Filters.indexOf(Tags[i]) == -1)
                {
                    this._Filters.push(Tags[i]);
                }
            }
        }
    }
    public ApplyFilter(Tag:string)
    {
        this._FilteredItems = [];
        for(let i in this._Items)
        {
            if(this._Items[i].Tags.indexOf(Tag) != -1)
            {
                this._FilteredItems.push(this._Items[i]);
            }
        }
    }
}
class SceneObjectManagerItem
{
    private _Name:string;
    private _Object:any;
    private _Tags:string[];
    public get Name():string { return this._Name; }
    public get Object():any { return this._Object; }
    public get Tags():string[] { return this._Tags; }
    public constructor(Name:string, Object:any, Tags?:string[])
    {
        this._Name = Name;
        this._Object = Object;
        if(Tags) this._Tags = Tags;
        else this._Tags = [];
    }
    public Apply(Scene:any) : void
    {
        Scene.AddSceneObject(this._Object.Copy());
    }
}