import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MayorymenorComponent } from './juegos/mayorymenor/mayorymenor.component';
import { AhorcadoComponent } from './juegos/ahorcado/ahorcado.component';

const routes:Routes =[
  {
    path:'',
    component:HomeComponent,
    children:[
      {
        path:'mayorymenor',
        component:MayorymenorComponent
      },
      {
        path:'ahorcado',
        component:AhorcadoComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  exports:[
    RouterModule
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeRouterModule { }
