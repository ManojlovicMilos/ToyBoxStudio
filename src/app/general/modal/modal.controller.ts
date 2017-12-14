export { ModalController }

class ModalController
{
    private _Visible:boolean;
    private _Title:string;
    private _Confirm:string;
    private _Callback:Function;
    public get Visible():boolean { return this._Visible; }
    public get Title():string { return this._Title; }
    public get Confirm():string { return this._Confirm; }
    public get Callback():Function { return this._Callback; }
    public set Callback(value:Function) { this._Callback = value; }
    public constructor()
    {
        this._Visible = false;
        this._Title = "Dialog";
        this._Confirm = "OK";
    }
    public Show(Title:string, Confirm:string)
    {
      this._Visible = true;
      this._Title = Title;
      this._Confirm = Confirm;
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