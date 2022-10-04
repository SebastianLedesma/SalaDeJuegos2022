import { Component, OnInit } from '@angular/core';
import { CartasService } from './services/cartas.service';
import { Card, Carta } from './interface/carta.interface';
import { RegistroPuntajeService } from '../services/registro-puntaje.service';
import { RegistroPuntaje } from '../interfaces/registro-puntaje';

@Component({
  selector: 'app-mayorymenor',
  templateUrl: './mayorymenor.component.html',
  styleUrls: ['./mayorymenor.component.css']
})
export class MayorymenorComponent implements OnInit {

  cartaEnPantalla?: Card;
  siguienteCarta?: Card;
  continuaJuego: boolean = true;
  nroAciertos: number = 0;
  mensaje: string = '';
  display: string = '';

  puntajes:RegistroPuntaje[]=[];
  registroAMostrar?:RegistroPuntaje;

  constructor(private _cartaService: CartasService, private _regPuntajeService:RegistroPuntajeService) { }


  ngOnInit(): void {
    
    this._regPuntajeService.obtenerPuntajesPorJuego('mayor y menor')
    .then( (registros: RegistroPuntaje[]) => {
      this.puntajes = registros;
      this.puntajes = this.puntajes.sort((a:any,b:any) => b.puntaje - a.puntaje);
      this.registroAMostrar = this.puntajes[0];
    })
  }

  empezarJuego() {
    this.display = 'block';
    this.nroAciertos = 0;
    this.mensaje = '';
    this.continuaJuego=true;
    
    this._cartaService.obtenerCarta()
      .subscribe(resp => {
        this.cartaEnPantalla = resp.cards[0];
      });
  }

  verificarResultado(eleccion: string) {
    let valorDeCartaActual = this.cartaEnPantalla?.value;
    let valorDeCartaSiguiente = this.siguienteCarta?.value;

    const nroCartaActual = this.convertirNroDeCarta(valorDeCartaActual!);
    const nroCartaSiguiente = this.convertirNroDeCarta(valorDeCartaSiguiente!);

    if (nroCartaActual == nroCartaSiguiente) {
     
      this.pedirCarta(eleccion);
    } else {
      if ((nroCartaSiguiente > nroCartaActual && eleccion == 'mayor') || (nroCartaSiguiente < nroCartaActual && eleccion == 'menor')) {
        this.nroAciertos++;
        this.cartaEnPantalla = this.siguienteCarta!;
        //console.log('continua');
      } else {
        this.cartaEnPantalla = this.siguienteCarta!;


        this._regPuntajeService.agregarRegistro(this.nroAciertos,'mayor y menor');
        //console.log('perdio');
        this.cerrarJuego();
      }
    }
  }

  pedirCarta(eleccion:string) {
    this._cartaService.obtenerCarta()
      .subscribe( resp =>{
        this.siguienteCarta = resp.cards[0];
        
        this.verificarResultado(eleccion);
      });
  }


  obtenerSiguienteCarta() {
    this._cartaService.obtenerCarta()
      .subscribe(resp => {
        this.siguienteCarta = resp.cards[0];
        console.log('siguiente:', this.siguienteCarta);
      })
  }

  convertirNroDeCarta(valor: string) {
    let valorNumerico: number;

    if (valor.length > 2) {
      valor = valor.substring(0, 1);
    }

    switch (valor) {
      case 'J':
        valorNumerico = 11;
        break;
      case 'Q':
        valorNumerico = 12;
        break;
      case 'K':
        valorNumerico = 13;
        break;
      case 'A':
        valorNumerico = 1;
        break;
      default:
        valorNumerico = parseInt(valor);
        break;
    }
    return valorNumerico;
  }


  cerrarJuego() {
    this.continuaJuego = false;
    this.mensaje = `Tu puntucación es ${this.nroAciertos}.`;
    this.display = 'none'
  }


}
