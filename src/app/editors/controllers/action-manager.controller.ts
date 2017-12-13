export { ActionController }

class ActionController
{
    private _UndoStack:any[];
    private _RedoStack:any[];
    public constructor()
    {
        this._UndoStack = [];
        this._RedoStack = [];
    }
    public PushAction(Action:any)
    {
        this._UndoStack.push(Action);
    }
    public Undo() : void
    {
        if(this._UndoStack.length > 0)
        {
            let Action = this._UndoStack.pop();
            Action.ApplyUndo();
            this._RedoStack.push(Action);
        }
    }
    public Redo() : void
    {
        if(this._RedoStack.length > 0)
        {
            let Action = this._RedoStack.pop();
            Action.ApplyRedo();
            this._UndoStack.push(Action);
        }
    }
}