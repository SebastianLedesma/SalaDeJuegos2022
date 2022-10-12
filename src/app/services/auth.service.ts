import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _authService: AngularFireAuth) { }

  async loginUsuario(email: string, password: string) {
    try {
      return await this._authService.signInWithEmailAndPassword(email, password);
    } catch (error) {
      return error;
    }
  }


  async registrarUsuario(email: string, password: string) {
    return await this._authService.createUserWithEmailAndPassword(email, password);
  }


  async logOut(){
    this._authService.signOut();
  }


  getInfoUsuarioLogueado(){
    return this._authService.authState;
  }


  getIdUsuario(){
    const auth = getAuth();
    const id = auth.currentUser?.uid;

    return id;
  }

}
