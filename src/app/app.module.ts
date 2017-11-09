import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GamePanelComponent } from "./game-panel/game-panel.component";

@NgModule(
{
  declarations:
  [
    AppComponent,
    GamePanelComponent
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
