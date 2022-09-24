import { Component } from '@angular/core';
import { CartasService } from '../cartas.service';
import { Card, Carta } from './interface/carta.interface';

@Component({
  selector: 'app-mayorymenor',
  templateUrl: './mayorymenor.component.html',
  styleUrls: ['./mayorymenor.component.css']
})
export class MayorymenorComponent {

  cartaEnPantalla?: Card;
  siguienteCarta?: Card;
  continuaJuego: boolean = true;
  nroAciertos: number = 0;
  mensaje: string = '';
  display: string = '';

  constructor(private _cartaService: CartasService) { }

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
      //this.verificarResultado(eleccion);
      this.pedirCarta(eleccion);
    } else {
      if ((nroCartaSiguiente > nroCartaActual && eleccion == 'mayor') || (nroCartaSiguiente < nroCartaActual && eleccion == 'menor')) {
        this.nroAciertos++;
        this.cartaEnPantalla = this.siguienteCarta!;
        console.log('continua');
      } else {
        this.cartaEnPantalla = this.siguienteCarta!;
        console.log('perdio');
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
    console.log('convriete:', valorNumerico);
    return valorNumerico;
  }

  cerrarJuego() {
    this.continuaJuego = false;
    this.mensaje = `Tu puntucación es ${this.nroAciertos}.`;
    this.display = 'none'
  }

}
