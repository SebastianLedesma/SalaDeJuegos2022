import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

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
}
