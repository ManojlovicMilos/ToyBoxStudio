const FS = require('fs');
const Path = require('path');
const Settings = require('./Settings');
const Process = require('process');
const { spawn } = require('child_process');

function Exists(path)
{
    return FS.existsSync(path);
}
function IsDirectory(path)
{
    return FS.lstatSync(path).isDirectory();
}
function IsFile(path)
{
    return !IsDirectory(path);
}
function Make(path)
{
    try
    {
        FS.mkdirSync(path)
    }
    catch (err)
    {
        if (err.code !== 'EEXIST') console.warn('Directory "' + path + '" already exists.');
    }
}
function Rename(path, newPath)
{
    try
    {
        FS.renameSync(path, newPath);
    }
    catch (err)
    {
        console.error('Directory failed to rename: ' + err);
    }
}
function Remove(path)
{
    if (FS.existsSync(path))
    {
        FS.readdirSync(path).forEach(function(file, index)
        {
            var curPath = path + "/" + file;
            if (FS.lstatSync(curPath).isDirectory())
            {
                remove(curPath);
            }
            else
            {
                FS.unlinkSync(curPath);
            }
        });
        FS.rmdirSync(path);
    }
}
function Copy(source, target)
{
    if(FS.lstatSync(source).isDirectory())
    {
        _CopyFolder(source, target);
    }
    else _CopyFile(source, target);
}
function _CopyFile(source, target)
{
    var targetFile = target;
    if(FS.existsSync(target))
    {
        if(FS.lstatSync(target).isDirectory())
        {
            targetFile = Path.join(target, Path.basename(source));
        }
    }
    FS.writeFileSync(targetFile, FS.readFileSync(source));
}
function _CopyFolder( source, target )
{
    var files = [];
    var targetFolder = Path.join(target, Path.basename(source));
    if (!FS.existsSync(targetFolder))
    {
        FS.mkdirSync(targetFolder);
    }
    if (FS.lstatSync(source).isDirectory())
    {
        files = FS.readdirSync( source );
        files.forEach(function(file)
        {
            var curSource = Path.join(source, file);
            if (FS.lstatSync( curSource ).isDirectory())
            {
                _CopyFolder(curSource, targetFolder);
            }
            else
            {
                _CopyFile( curSource, targetFolder );
            }
        });
    }
}
function Read(path)
{
    return FS.readFileSync(path, 'utf8');
}
function Write(path, data)
{
    FS.writeFileSync(path, data);
}
function RunNpm(command, callback, error)
{
    Run(OSCode('npm'), ['run', command], callback, error);
}
function RunTBX(command, args, ignore, callback, error)
{
    let ignores = [];
    if(ignore != null && ignore.length > 0)
    {
        for(let i in ignore)
        {
            ignores.push('-no');
            ignores.push(ignore[i]);
        }
    }
    Run(OSCode('tbx'), [...ignores, '-' + command, ...args], callback, error);
}
function Run(command, arguments, callback, error)
{
    LogRun(command, arguments);
    process = spawn(command, arguments);
    if(Settings.Params.Verbose)
    {
        process.stdout.on('data', (data) => { console.info(`${data}`); });
        process.stderr.on('data', (data) => { console.error(`${data}`); });
    }
    process.on('close', function(code) {
        console.error("code:" + code);
        if(code == 0 && !!callback) callback();
        else if(code != 0) error(code);
    }.bind(this));
}
function LogRun(command, arguments)
{
    if(Settings.Params.Verbose)
    {
        console.info(command + " " + arguments.join(' '));
    }
}
function OSCode(variable)
{
    if(Settings.OS != 'win') return variable;
    if(variable == 'npm') return 'npm.cmd';
    if(variable == '7z') return '7z.exe';
    if(variable == 'tbx') return 'tbx.cmd';
    return variable;
}
function FormTree(Location)
{
    let TreeNode = { Name:Path.basename(Location), Type: "Dir", Path: Location, Children:[] }
    let Locations = FS.readdirSync(Location);
    for(let i in Locations)
    {
        if(FS.statSync(Location + "/" +Locations[i]).isFile())
        {
            TreeNode.Children.push({ FileName: Locations[i].slice(0, Locations[i].lastIndexOf(".")), Name: Locations[i], Type:"File", Extension:Path.extname(Locations[i]), Path:Location + "/" + Locations[i], Value:null });
        }
        else
        {
            TreeNode.Children.push(FormTree(Location + "/" + Locations[i]));
        }
    }
    return TreeNode;
}
function ChangeDir(path)
{
    Process.chdir(path);
}

module.exports = { Exists, IsFile, IsDirectory, Make, Rename, Remove, Copy, Read, Write, RunNpm, RunTBX, Run, OSCode, FormTree, ChangeDir };