import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MayorymenorComponent } from './juegos/mayorymenor/mayorymenor.component';
import { HomeRouterModule } from './home-router.module';
import { AhorcadoComponent } from './juegos/ahorcado/ahorcado.component';



@NgModule({
  declarations: [
    MayorymenorComponent,
    AhorcadoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HomeRouterModule
  ]
})
export class HomeModule { }
