import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { Encuesta } from '../interfaces/encuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  constructor(private _firestore:Firestore,private _authService:AuthService) { }


  agregarEncuesta(formulario:any){
    let nombreUsuario='';

    this._authService.getInfoUsuarioLogueado()
    .subscribe(resp =>{
      nombreUsuario = resp?.email || '';

      let encuesta:Encuesta = {
        usuario: nombreUsuario,
        fecha : new Date(),
        formulario : formulario
      }
  
      const registroRef = collection(this._firestore, 'encuestas');
      return addDoc(registroRef, encuesta);
    });
   
  }

}
