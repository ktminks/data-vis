// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { GraphComponent } from './graph/graph.component';
import { VisualizationComponent } from './visualization/visualization.component';
import { MapComponent } from './map/map.component';

@NgModule({
declarations: [
AppComponent,
GraphComponent,
MapComponent,
VisualizationComponent
],
imports: [
BrowserModule,
HttpClientModule,
BrowserAnimationsModule,
MatToolbarModule,
MatButtonModule
],
providers: [DataService],
bootstrap: [AppComponent]
})
export class AppModule { }
