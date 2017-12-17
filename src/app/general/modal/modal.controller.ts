export { ModalController, ModalControllerType }

enum ModalControllerType
{
    TextInput = 0,
    DataEditor = 1
}
class ModalController
{
    private _Big:boolean;
    private _Visible:boolean;
    private _Title:string;
    private _Confirm:string;
    private _Type:ModalControllerType;
    private _Value:any;
    private _Callback:Function;
    public get Big():boolean { return this._Big; }
    public set Big(value:boolean) { this._Big = value; }
    public get Visible():boolean { return this._Visible; }
    public get Title():string { return this._Title; }
    public get Confirm():string { return this._Confirm; }
    public get Type():ModalControllerType { return this._Type; }
    public get Value():any { return this._Value; }
    public get Callback():Function { return this._Callback; }
    public set Callback(value:Function) { this._Callback = value; }
    public constructor()
    {
        this._Visible = false;
        this._Title = "Dialog";
        this._Confirm = "OK";
    }
    public Show(Title:string, Confirm:string, Type?:ModalControllerType, Value?:any)
    {
      this._Visible = true;
      this._Title = Title;
      this._Confirm = Confirm;
      if(Type) this._Type = Type;
      else this._Type = ModalControllerType.TextInput;
      this._Value = Value;
    }
    public Hide()
    {
      this._Visible = false;
    }
    public Complete(Value)
    {
      this._Visible = false;
      if(this._Callback) this._Callback(Value);
    }
}