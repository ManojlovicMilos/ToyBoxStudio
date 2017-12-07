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
        this._Window.MainMenu.CreateFileMenu([this.NewProject.bind(this)]);
    }
    NewProject()
    {
        dialog.showSaveDialog({title:"Where to create new project?", defaultPath:app.getAppPath("documents"), buttonLabel:"Create"}, this.NewProjectCallback.bind(this));
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
            let DirTree = this._FS.ReadDirectoryTree(filename);
            this._Window.Window.webContents.send('project-loaded' , DirTree);
        }
    }
}

module.exports = ProjectIO;