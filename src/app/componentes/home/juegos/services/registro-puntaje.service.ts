import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { async, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RegistroPuntaje } from '../interfaces/registro-puntaje';


@Injectable({
  providedIn: 'root'
})
export class RegistroPuntajeService {

  constructor(private _firestore: Firestore, private _authService: AuthService) { }

  agregarRegistro(nroAciertos: number, nombreJuego: string) {
    let nombreUsuario = '';

    this._authService.getInfoUsuarioLogueado()
      .subscribe(resp => {
        nombreUsuario = resp?.email || '';

        let registroPuntaje: RegistroPuntaje = {
          usuario: nombreUsuario,
          fechaDePuntaje: new Date(),
          puntaje: nroAciertos,
          juego: nombreJuego
        }

        const registroRef = collection(this._firestore, 'puntajes');
        return addDoc(registroRef, registroPuntaje);
      });
  }


  async obtenerPuntajesPorJuego(nombreJuego: string) {

    let registros: RegistroPuntaje[] = [];

    const q = query(collection(this._firestore, "puntajes"), where("juego", "==", nombreJuego));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          registros.push(doc.data());
        });

    return registros;
  }



}
