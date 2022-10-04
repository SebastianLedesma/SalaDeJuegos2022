import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MayorymenorComponent } from './juegos/mayorymenor/mayorymenor.component';
import { AhorcadoComponent } from './juegos/ahorcado/ahorcado.component';
import { EncuentraElFantasmaComponent } from './juegos/encuentra-el-fantasma/encuentra-el-fantasma.component';
import { PreguntadoComponent } from './juegos/preguntado/preguntado.component';
import { QuienSoyComponent } from '../quien-soy/quien-soy.component';
import { EncuestaComponent } from './encuesta/encuesta.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'mayorymenor',
        component: MayorymenorComponent
      },
      {
        path: 'ahorcado',
        component: AhorcadoComponent
      },
      {
        path: 'encuentra-fantasma',
        component: EncuentraElFantasmaComponent
      },
      {
        path: 'preguntado',
        component: PreguntadoComponent
      },
      {
        path: 'quien-soy',
        component: QuienSoyComponent,
        pathMatch: 'full'
      },
      {
        path:'encuesta',
        component: EncuestaComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  exports: [
    RouterModule
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeRouterModule { }
