import { Component, Input, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';

import { FirestoreService } from '../../services/firestore.service';
import { Mensaje } from './interface/mensaje.interface';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  texto: string = '';
  mensajes:Mensaje[]=[];
  nombreUsuario:string = '';

  constructor(private _firestore: FirestoreService, private _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.getInfoUsuarioLogueado()
    .subscribe(resp =>{
      this.nombreUsuario = resp?.email || '';
    });

    this._firestore.obtenerMensajes()
    .subscribe(mensajes =>{
      this.mensajes = mensajes.sort((a:any,b:any) => a.fecha - b.fecha);
    })
  }

  publicarMensaje() {
    const mensaje:Mensaje={
      usuario:this.nombreUsuario,
      texto:this.texto,
      fecha: Timestamp.now()
    }

    const resp = this._firestore.agregarMensaje(mensaje);
    this.texto = '';
  }

}
