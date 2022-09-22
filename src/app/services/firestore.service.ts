import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Mensaje } from '../componentes/chat/interface/mensaje.interface';
import { Registro } from '../interfaces/registro';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {


  constructor(private _firestore:Firestore) { }

  agregarLog(registro:Registro){
    const registroRef = collection(this._firestore, 'registros');
    return addDoc(registroRef, registro);
  }

  agregarMensaje(mensaje:Mensaje){
    const mensajeRef = collection(this._firestore,'mensajes');
    return addDoc(mensajeRef,mensaje);
  }


  obtenerMensajes():Observable<Mensaje[]>{
    const mensajeRef = collection(this._firestore, 'mensajes');
    return collectionData(mensajeRef, {idField:'id'}) as Observable<Mensaje[]>;
  }

}
