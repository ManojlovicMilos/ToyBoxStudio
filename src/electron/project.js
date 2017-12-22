'use strict';

const { app, Menu, MenuItem, dialog, ipcMain } = require('electron');

const FileSystem = require("./fsmanager");

class ProjectIO
{
    constructor(Window)
    {
        this._Window = Window;
        this._FS = new FileSystem();
        this.Init();
    }
    Init()
    {
        this._Window.MainMenu.CreateFileMenu([this.NewProject.bind(this), this.OpenProject.bind(this), this.SaveCurrentFile.bind(this)]);
        this._Window.MainMenu.CreateEditMenu([this.Copy.bind(this), this.Paste.bind(this)]);
        this._Window.MainMenu.CreateProjectMenu([this.AddScene.bind(this), this.AddSpriteSet.bind(this), this.AddImageCollection.bind(this), this.AddScript.bind(this)]);
        ipcMain.on("save-file", this.SaveFile.bind(this));
        ipcMain.on("open-file", this.ReadFile.bind(this));
        ipcMain.on("open-text-file", this.ReadTextFile.bind(this));
    }
    NewProject()
    {
        dialog.showSaveDialog({title:"Where to create new project?", defaultPath:app.getAppPath("desktop"), buttonLabel:"Create"}, this.NewProjectCallback.bind(this));
    }
    OpenProject()
    {
        dialog.showOpenDialog({properties:["openDirectory"], title:"Open your existing project.", defaultPath:app.getAppPath("desktop"), buttonLabel:"Open"}, this.OpenProjectCallback.bind(this));
    }
    NewProjectCallback(filename)
    {
        if (this._FS.LocationExists(filename))
        {
            dialog.showMessageBox({title:"Location Exists", message:"Chosen location already exists.\nPlease pick another one.", buttons:["OK"]}, this.NewProject.bind(this));
        }
        else
        {
            this._FS.CreateProjectDirectories(filename);
            this._FS.CreateNewProjectConfig(filename);
            this._FS.CreateProjectCode(filename);
            let DirTree = this._FS.ReadDirectoryTree(filename);
            this._Window.Window.webContents.send('project-loaded' , DirTree);
        }
    }
    OpenProjectCallback(filenames)
    {
        let DirTree = this._FS.ReadDirectoryTree(filenames[0]);
        this._Window.Window.webContents.send('project-loaded' , DirTree);
    }
    AddScript()
    {
        this._Window.Window.webContents.send('add-script');
    }
    AddScene()
    {
        this._Window.Window.webContents.send('add-scene');
    }
    AddSpriteSet()
    {
        this._Window.Window.webContents.send('add-sprite-set');
    }
    AddImageCollection()
    {
        this._Window.Window.webContents.send('add-image-collection');
    }
    SaveCurrentFile()
    {
        this._Window.Window.webContents.send('save-current-file');
    }
    SaveFile(Event, Args)
    {
        let Path = Args[0];
        let File = Args[1];
        this._FS.WriteFile(Path, JSON.stringify(File));
    }
    ReadFile(Event, Args)
    {
        let Path = Args[0];
        let Data = this._FS.ReadFile(Path);
        Event.returnValue = Data;
    }
    ReadTextFile(Event, Args)
    {
        let Path = Args[0];
        let Data = this._FS.ReadTextFile(Path);
        Event.returnValue = Data;
    }
    Copy()
    {
        this._Window.Window.webContents.send('edit-copy');
    }
    Paste()
    {
        this._Window.Window.webContents.send('edit-paste');
    }
}

module.exports = ProjectIO;