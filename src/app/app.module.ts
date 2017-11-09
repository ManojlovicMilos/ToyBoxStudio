import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GamePanelComponent } from "./game-panel/game-panel.component";
import { ScenePanelComponent } from "./scene-panel/scene-panel.component";
import { SceneObjectManagerComponent } from "./scene-panel/scene-object-manager/scene-object-manager.component";
import { LibraryComponent } from "./scene-panel/library/library.component";

@NgModule(
{
  declarations:
  [
    AppComponent,
    GamePanelComponent,
    ScenePanelComponent,
    SceneObjectManagerComponent,
    LibraryComponent
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
