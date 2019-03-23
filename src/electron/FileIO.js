'use strict';

const { app, Menu, MenuItem, dialog, ipcMain } = require('electron');

const System = require("./System");

class FileIO
{
    constructor(window)
    {
        this.window = window;
        this.init();
    }
    init()
    {
        ipcMain.on("to-open-file", this.openFile.bind(this));
    }
    openFile(event, file)
    {
        console.log(file);
        let fileData = System.Read(file.Path);
        file.Data = fileData;
        console.log(fileData);
        this.window.Send('from-file-open', file);
    }
}

module.exports = FileIO;