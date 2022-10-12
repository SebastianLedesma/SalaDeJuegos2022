import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from '../../../services/firestore.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {

  constructor(private authService: AuthService, private fireStoresService: FirestoreService,private router:Router) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    const uid = this.authService.getIdUsuario();
    const doc = (await this.fireStoresService.obtenerDoc('usuarios',uid!)).data();
    if(doc?.perfil == 'user'){
      return true;
    }else{
      this.router.navigate(['/home/respuestas']);
      return false;
    }
    
  }

}

