import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  chatActivado:boolean = false;
  textoBoton:string='Mostrar chat';

  constructor() { }

  ngOnInit(): void {
  }

  accionarChat(){
    this.chatActivado = !this.chatActivado;
    this.textoBoton = this.chatActivado ? 'Ocultar chat' : 'Mostrar chat';
  }

}
