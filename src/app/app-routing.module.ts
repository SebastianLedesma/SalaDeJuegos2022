import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate,redirectUnauthorizedTo } from '@angular/fire/auth-guard';

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
    ...canActivate(() => redirectUnauthorizedTo(['/'])),
    loadChildren:() => import('./componentes/home/home.module').then(m => m.HomeModule)
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
