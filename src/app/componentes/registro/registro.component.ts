import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FirebaseError } from '@angular/fire/app';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  email:string='';
  password:string='';
  passwordAConfirmar='';
  datosValidos:boolean = true;
  mensajeError = '';

  constructor(private _authService: AuthService,private router:Router) { }

  limpiarForm():void{
    this.email='';
    this.password='';
    this.passwordAConfirmar='';
    this.mensajeError = '';
  }


  validarPassword():boolean{
    return this.password === this.passwordAConfirmar;
  }

  
  verDatos(){
    console.log(this.email);
    console.log(this.password);
    console.log(this.passwordAConfirmar);
    console.log(this.validarPassword());
  }

  registrarUsuario(){
    this.mensajeError = '';
    if(this.validarPassword()){
      this._authService.registrarUsuario(this.email,this.password)
      .then(resp => {
        if(resp instanceof FirebaseError){
          //console.log(resp.message);
          this.mensajeError = resp.message;
        }else{
          this.datosValidos=true;
          this.router.navigate(['/home']);
        } 
      }); 
    }else{
      this.mensajeError = 'Verifique los datos ingresados.';
      this.datosValidos = false;
    }
   
  }
  
}
