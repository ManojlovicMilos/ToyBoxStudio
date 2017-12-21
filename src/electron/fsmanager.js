'use strict';

const fs = require('fs');
const path = require('path');
const RootPath = __dirname + "/../../dist/";

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
    ReadBinaryFile(Location)
    {
        return fs.readFileSync(Location);
    }
    ReadTextFile(Location)
    {
        return fs.readFileSync(Location, "utf8");
    }
    CreateProjectDirectories(Location)
    {
        fs.mkdirSync(Location);
        fs.mkdirSync(Location + "/Assets");
        fs.mkdirSync(Location + "/Assets/Scenes");
        fs.mkdirSync(Location + "/Assets/SceneObjects");
        fs.mkdirSync(Location + "/Code");
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
    CreateProjectCode(Location)
    {
        let ProjectName = path.basename(Location);

        let Package = this.ReadTextFile(RootPath + "assets/code/package.json.data");
        Package = Package.replace("[[PROJECT_NAME_SMALL]]", ProjectName.toLowerCase());
        this.WriteFile(Location + "/package.json", Package);

        let TSConfig = this.ReadTextFile(RootPath + "assets/code/tsconfig.json.data");
        this.WriteFile(Location + "/tsconfig.json", TSConfig);

        let WebpackConfig = this.ReadTextFile(RootPath + "assets/code/webpack.config.js.data");
        WebpackConfig = WebpackConfig.replace("[[PROJECT_NAME_SMALL]]", ProjectName.toLowerCase());
        this.WriteFile(Location + "/webpack.config.js", WebpackConfig);

        let GitIgnore = this.ReadTextFile(RootPath + "assets/code/gitignore");
        GitIgnore = GitIgnore.replace("[[PROJECT_NAME_SMALL]]", ProjectName.toLowerCase());
        this.WriteFile(Location + "/.gitignore", GitIgnore);

        let IndexHTML = this.ReadTextFile(RootPath + "assets/code/index.html");
        IndexHTML = IndexHTML.replace("[[PROJECT_NAME]]", ProjectName);
        IndexHTML = IndexHTML.replace("[[PROJECT_NAME_SMALL]]", ProjectName.toLowerCase());
        this.WriteFile(Location + "/index.html", IndexHTML);

        let App = this.ReadTextFile(RootPath + "assets/code/App.ts.data");
        this.WriteFile(Location + "/Code/App.ts", App);

        let Engineer = this.ReadTextFile(RootPath + "assets/code/Engineer.ts.data");
        this.WriteFile(Location + "/Code/Engineer.ts", Engineer);

        let GameLogic = this.ReadTextFile(RootPath + "assets/code/GameLogic.ts.data");
        GameLogic = GameLogic.replace("[[PROJECT_NAME]]", ProjectName);
        this.WriteFile(Location + "/Code/GameLogic.ts", GameLogic);

        let MainMenu = this.ReadTextFile(RootPath + "assets/code/MainMenu.ts.data");
        this.WriteFile(Location + "/Code/MainMenu.ts", MainMenu);

        let GameScene = this.ReadTextFile(RootPath + "assets/code/GameScene.ts.data");
        this.WriteFile(Location + "/Code/GameScene.ts", GameScene);

        let PlayButton = this.ReadBinaryFile(RootPath + "assets/resources/Play.png");
        this.WriteFile(Location + "/Resources/Textures/Play.png", GameScene);
    }
    ReadDirectoryTree(Location)
    {
        let TreeNode = { Name:path.basename(Location), Type: "Dir", Path: Location, Children:[] }
        let Locations = fs.readdirSync(Location);
        for(let i in Locations)
        {
            if(fs.statSync(Location + "/" +Locations[i]).isFile())
            {
                TreeNode.Children.push({ FileName: Locations[i], Name: Locations[i].slice(0, Locations[i].lastIndexOf(".")), Type:"File", Extension:path.extname(Locations[i]), Path:Location + "/" + Locations[i], Value:null });
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