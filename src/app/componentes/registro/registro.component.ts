import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FirebaseError } from '@angular/fire/app';
import { Usuario } from './interfaces/usuario.interface';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  nuevoUsuario:Usuario={
    uuid:'',
    correo:'',
    perfil:'user'
  }

  email:string='';
  password:string='';
  passwordAConfirmar='';
  datosValidos:boolean = true;
  mensajeError = '';

  constructor(private _authService: AuthService,private router:Router,private _firestoreService: FirestoreService) { }

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

  async registrarUsuario(){
    
    this.mensajeError = ''
    if(this.validarPassword()){
      const resp = await this._authService.registrarUsuario(this.email,this.password)
      .catch( (error:FirebaseError) => {
        this.mensajeError = error.message;
      }); 

      if(resp){
        this._firestoreService.agregarNuevoUsuario(this.crearUsuario(resp.user!.uid),'usuarios',resp.user!.uid).then(resp => {
          this.datosValidos=true;
          this.router.navigate(['/home']);
        })
        .catch( error => console.log(error));
      }

    }else{
      this.mensajeError = 'Verifique los datos ingresados.';
      this.datosValidos = false;
    }
  }

  crearUsuario(id:string):Usuario{
    this.nuevoUsuario = {
      uuid: id,
      correo: this.email,
      perfil:'user'
    }

    return this.nuevoUsuario;
  }
  
}
