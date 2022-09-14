import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate,redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { RegistroComponent } from './componentes/registro/registro.component';

const routes: Routes = [
  {
    path:'',
    component: LoginComponent,
    pathMatch:'full'
  },
  {
    path:'home',
    component: HomeComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/']))
  },
  {
    path:'quien-soy',
    component:QuienSoyComponent,
    pathMatch:'full'
  },
  {
    path:'registro',
    component: RegistroComponent
  },
  {
    path:'**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
