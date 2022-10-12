import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private fireStoresService: FirestoreService,private router:Router){}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    const uid = this.authService.getIdUsuario();
    const doc = (await this.fireStoresService.obtenerDoc('usuarios',uid!)).data();

    if(doc?.perfil == 'admin'){
      return true;
    }else{
      this.router.navigate(['/home/encuesta']);
      return false;
    }
  }
  
}
