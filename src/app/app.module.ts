import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GamePanelComponent } from "./game-panel/game-panel.component";
import { ScenePanelComponent } from "./scene-panel/scene-panel.component";
import { ObjectsComponent } from "./scene-panel/objects/objects.component";
import { LibraryComponent } from "./scene-panel/library/library.component";
import { SceneComponent } from "./scene-panel/scene/scene.component";

@NgModule(
{
  declarations:
  [
    AppComponent,
    GamePanelComponent,
    ScenePanelComponent,
    ObjectsComponent,
    LibraryComponent,
    SceneComponent
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
