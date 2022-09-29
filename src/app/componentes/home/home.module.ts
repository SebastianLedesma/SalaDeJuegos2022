import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MayorymenorComponent } from './juegos/mayorymenor/mayorymenor.component';
import { HomeRouterModule } from './home-router.module';
import { AhorcadoComponent } from './juegos/ahorcado/ahorcado.component';
import { EncuentraElFantasmaComponent } from './juegos/encuentra-el-fantasma/encuentra-el-fantasma.component';
import { PreguntadoComponent } from './juegos/preguntado/preguntado.component';



@NgModule({
  declarations: [
    MayorymenorComponent,
    AhorcadoComponent,
    EncuentraElFantasmaComponent,
    PreguntadoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HomeRouterModule
  ]
})
export class HomeModule { }
