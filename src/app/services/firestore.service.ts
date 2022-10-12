import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Mensaje } from '../componentes/chat/interface/mensaje.interface';
import { Registro } from '../interfaces/registro';
import { Usuario } from '../componentes/registro/interfaces/usuario.interface';
import { doc, setDoc } from '@firebase/firestore';
import { Encuesta } from '../componentes/home/encuesta/interfaces/encuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {


  constructor(private _firestore: Firestore) { }

  async agregarNuevoUsuario(nuevoUsuario: Usuario, nombre: string, id: string) {
    return await setDoc(doc(this._firestore, nombre, id), nuevoUsuario);
  }

  agregarLog(registro: Registro) {
    const registroRef = collection(this._firestore, 'registros');
    return addDoc(registroRef, registro);
  }

  agregarMensaje(mensaje: Mensaje) {
    const mensajeRef = collection(this._firestore, 'mensajes');
    return addDoc(mensajeRef, mensaje);
  }


  obtenerMensajes(): Observable<Mensaje[]> {
    const mensajeRef = collection(this._firestore, 'mensajes');
    return collectionData(mensajeRef, { idField: 'id' }) as Observable<Mensaje[]>;
  }

  obtenerEncuestas(): Observable<Encuesta[]> {
    const mensajeRef = collection(this._firestore, 'encuestas');
    return collectionData(mensajeRef, { idField: 'id' }) as Observable<Encuesta[]>;
  }

  obtenerDoc(nombre: string, uid: string) {
    const docRef = doc(this._firestore, nombre, uid);
    const resp =  getDoc<Usuario>(docRef);

    return resp;
  }

}
