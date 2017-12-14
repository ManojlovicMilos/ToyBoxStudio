'use strict';

const fs = require('fs');
const path = require('path');

class FileSystem
{
    constructor()
    {
        this._CurrentLocation = __dirname;
    }
    LocationExists(Location)
    {
        return fs.existsSync(Location);
    }
    CreateDirectory(Location)
    {
        return fs.mkdirSync(Location);
    }
    WriteFile(Location, Data)
    {
        fs.writeFileSync(Location, Data);
    }
    ReadFile(Location)
    {
        return JSON.parse(fs.readFileSync(Location, "utf8"));
    }
    CreateProjectDirectories(Location)
    {
        fs.mkdirSync(Location);
        fs.mkdirSync(Location + "/Assets");
        fs.mkdirSync(Location + "/Assets/Scenes");
        fs.mkdirSync(Location + "/Assets/SceneObjects");
        fs.mkdirSync(Location + "/Resources");
        fs.mkdirSync(Location + "/Resources/Sounds");
        fs.mkdirSync(Location + "/Resources/SpriteSets");
        fs.mkdirSync(Location + "/Resources/ImageCollections");
        fs.mkdirSync(Location + "/Resources/Materials");
        fs.mkdirSync(Location + "/Resources/Textures");
        fs.mkdirSync(Location + "/Resources/Object3D");
    }
    CreateNewProjectConfig(Location)
    {
        let ProjectName = path.basename(Location);
        let ProjectConfig =
        {
            Name: ProjectName,
            CreatedAt: Date.now(),
            Version: 0
        };
        this.WriteFile(Location + "/toybox-config.json", JSON.stringify(ProjectConfig));
    }
    ReadDirectoryTree(Location)
    {
        let TreeNode = { Name:path.basename(Location), Type: "Dir", Path: Location, Children:[] }
        let Locations = fs.readdirSync(Location);
        for(let i in Locations)
        {
            if(fs.statSync(Location + "/" +Locations[i]).isFile())
            {
                TreeNode.Children.push({ Name: Locations[i], Type:"File", Extension:path.extname(Locations[i]), Path:Location + "/" + Locations[i], Value:null });
            }
            else
            {
                TreeNode.Children.push(this.ReadDirectoryTree(Location + "/" + Locations[i]));
            }
        }
        return TreeNode;
    }
}

module.exports = FileSystem;