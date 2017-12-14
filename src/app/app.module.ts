import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxElectronModule } from 'ngx-electron';

import { ModalComponent } from "./general/modal/modal.component";
import { TextDialogComponent } from "./general/modal/modal-content/text-dialog/text-dialog.component";

import { AppComponent } from './app.component';
import { ProjectComponent } from "./project/project.component";
import { TreeNodeComponent } from "./project/tree-node/tree-node.component";
import { SearchComponent } from "./search/search.component";
import { TabComponent } from "./tab-navigation/tab/tab.component";
import { TabNavigationComponent } from "./tab-navigation/tab-navigation.component";

import { Scene2DEditorComponent } from "./editors/scene-editors/scene-2D-editor/scene-2D-editor.component";

import { ObjectsComponent } from "./editors/scene-editors/scene-2D-editor/objects/objects.component";
import { SceneComponent } from "./editors/scene-editors/scene-2D-editor/scene/scene.component";
import { PropertiesComponent } from "./editors/scene-editors/scene-2D-editor/properties/properties.component";
import { TransformComponent } from "./editors/scene-editors/scene-2D-editor/view/transform/transform.component";
import { ViewComponent } from "./editors/scene-editors/scene-2D-editor/view/view.component";
import { ScenePropertiesComponent } from "./editors/scene-editors/scene-2D-editor/properties/scene-properties/scene-properties.component";
import { SceneObjectPropertiesComponent } from "./editors/scene-editors/scene-2D-editor/properties/scene-object-properties/scene-object-properties.component";
import { DrawObjectPropertiesComponent } from "./editors/scene-editors/scene-2D-editor/properties/draw-object-properties/draw-object-properties.component";

import { SpriteSetEditorComponent } from "./editors/sprite-set-editor/sprite-set-editor.component";

import { SpriteSetListComponent } from "./editors/sprite-set-editor/sprite-set-list/sprite-set-list.component";

@NgModule(
{
  declarations:
  [
    ModalComponent,
    TextDialogComponent,

    AppComponent,
    ProjectComponent,
    TreeNodeComponent,
    SearchComponent,
    TabComponent,
    TabNavigationComponent,
    
    Scene2DEditorComponent,
    ObjectsComponent,
    SceneComponent,
    PropertiesComponent,
    TransformComponent,
    ViewComponent,
    ScenePropertiesComponent,
    SceneObjectPropertiesComponent,
    DrawObjectPropertiesComponent,

    SpriteSetEditorComponent,
    SpriteSetListComponent
  ],
  imports:
  [
    BrowserModule,
    FormsModule,
    NgxElectronModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
