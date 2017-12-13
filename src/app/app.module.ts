import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxElectronModule } from 'ngx-electron';

import { TextDialogComponent } from "./general/text-dialog/text-dialog.component";

import { AppComponent } from './app.component';
import { ProjectComponent } from "./project/project.component";
import { TreeNodeComponent } from "./project/tree-node/tree-node.component";
import { SearchComponent } from "./search/search.component";
import { TabComponent } from "./tab-navigation/tab/tab.component";
import { TabNavigationComponent } from "./tab-navigation/tab-navigation.component";

import { GamePanelComponent } from "./game-panel/game-panel.component";

import { ScenePanelComponent } from "./scene-panel/scene-panel.component";
import { ObjectsComponent } from "./scene-panel/objects/objects.component";
import { SceneComponent } from "./scene-panel/scene/scene.component";
import { PropertiesComponent } from "./scene-panel/properties/properties.component";
import { TransformComponent } from "./scene-panel/view/transform/transform.component";
import { ViewComponent } from "./scene-panel/view/view.component";
import { ScenePropertiesComponent } from "./scene-panel/properties/scene-properties/scene-properties.component";
import { SceneObjectPropertiesComponent } from "./scene-panel/properties/scene-object-properties/scene-object-properties.component";
import { DrawObjectPropertiesComponent } from "./scene-panel/properties/draw-object-properties/draw-object-properties.component";

@NgModule(
{
  declarations:
  [
    TextDialogComponent,

    AppComponent,
    ProjectComponent,
    TreeNodeComponent,
    SearchComponent,
    TabComponent,
    TabNavigationComponent,

    GamePanelComponent,
    
    ScenePanelComponent,
    ObjectsComponent,
    SceneComponent,
    PropertiesComponent,
    TransformComponent,
    ViewComponent,
    ScenePropertiesComponent,
    SceneObjectPropertiesComponent,
    DrawObjectPropertiesComponent
  ],
  imports: [BrowserModule, FormsModule, NgxElectronModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
