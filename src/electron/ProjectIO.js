'use strict';

const { app, Menu, MenuItem, dialog, ipcMain } = require('electron');

//import System from "./System";
const System = require("./System");

class ProjectIO
{
    constructor(window)
    {
        this.window = window;
        this.init();
    }
    init()
    {
        ipcMain.on("to-create-project", this.createProject.bind(this));
        ipcMain.on("to-open-project", this.openProject.bind(this));
    }
    createProject(event, params)
    {
        this.params = params;
        dialog.showOpenDialog({
                title:"Where to create new project?",
                defaultPath:app.getAppPath("desktop"),
                buttonLabel:"Create",
                properties: ['openDirectory']
            }, this.createProject_PathChosen.bind(this));
    }
    createProject_PathChosen(path)
    {
        this.window.Send('from-create-project-create');
        if(path == null || path.length == 0) return;
        this.path = path[0];
        if(!System.Exists(this.path )) return;
        if(!System.IsDirectory(this.path )) return;
        System.ChangeDir(this.path);
        let name = this.params.name;
        let description = this.params.description;
        let author = this.params.author;
        System.RunTBX('init', [name, description, author], ['deps'], this.createProject_InitFinished.bind(this), this.createProject_Failed.bind(this));
    }
    createProject_InitFinished(filename)
    {
        this.window.Send('from-create-project-init');
        System.ChangeDir(this.path + '/' + this.params.name);
        System.RunTBX('deps', [], [], this.createProject_DepsFinished.bind(this), this.createProject_Failed.bind(this));
    }
    createProject_DepsFinished(filename)
    {
        this.window.Send('from-create-project-deps');
        System.ChangeDir(this.path);
        let tree = System.FormTree(this.params.name);
        System.ChangeDir(this.path + '/' + this.params.name);
        this.window.Send('from-project-data', tree);
    }
    createProject_Failed(event, code)
    {
        console.error("Failed with code: " + code);
        dialog.showMessageBox('Error', 'Failed to create new project. Code:' + code);
    }
    openProject()
    {
        dialog.showOpenDialog({
            title:"Where is your project?",
            defaultPath:app.getAppPath("desktop"),
            buttonLabel:"Open",
            properties: ['openDirectory']
        }, this.openProject_PathChosen.bind(this));
    }
    openProject_PathChosen(path)
    {
        this.window.Send('from-open-project-started');
        if(path == null || path.length == 0) return;
        this.path = path[0];
        if(!System.Exists(this.path )) return;
        if(!System.IsDirectory(this.path )) return;
        let tree = System.FormTree(this.path);
        System.ChangeDir(this.path);
        this.window.Send('from-project-data', tree);
    }
}

module.exports = ProjectIO;