import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FirebaseError } from '@angular/fire/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  mensajeError = '';

  obj = {
    email: 'ricardo@gmail.com',
    password: '123456'
  }

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  llenarForm(): void {
    this.email = this.obj.email;
    this.password = this.obj.password;
  }

  limpiarForm(): void {
    this.email = '';
    this.password = '';
  }

  loguinUsuario() {
    this.mensajeError = '';
    this._authService.loginUsuario(this.email, this.password)
      .then(resp => {

        if (resp instanceof FirebaseError) {
          this.mensajeError = 'El email o password no corresponde a un usuario válido.';
        } else {
          this._router.navigate(['/home']);
        }
      });
  }

}
