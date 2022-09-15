import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from '@firebase/app-compat';


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
    try {
      return await this._authService.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      return error;
    }
  }


  async logOut(){
    this._authService.signOut();
  }


  getInfoUsuarioLogueado(){
    return this._authService.authState;
  }

}
