import { Component, OnInit } from '@angular/core';
import { RegistroPuntaje } from '../interfaces/registro-puntaje';
import { RegistroPuntajeService } from '../services/registro-puntaje.service';

import { LetraBoton } from './interface/letra-boton.interface';
import { AhorcadoService } from './services/ahorcado.service';



@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  abecedario: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  palabraEscondida: Array<LetraBoton> = [];

  maximosIntentos: number = 6;
  intentosRestantes!: number;
  letrasDeBotones: Array<LetraBoton> = [];
  mensaje: string = '';
  caracterOculto = "_";
  rondasJugadas:number=0;

  juegoIniciado: boolean = false;
  rondaIniciada = false;

  puntajes:RegistroPuntaje[]=[];
  registroAMostrar?:RegistroPuntaje;

  constructor(private palabrasService: AhorcadoService,private _regPuntajeService:RegistroPuntajeService) { }

  ngOnInit(): void {
    this._regPuntajeService.obtenerPuntajesPorJuego('ahorcado')
    .then( (registros: RegistroPuntaje[]) => {
      this.puntajes = registros;
      this.puntajes = this.puntajes.sort((a:any,b:any) => b.puntaje - a.puntaje);
      this.registroAMostrar = this.puntajes[0];
    })
    this.rondasJugadas=0;
  }


  elegirPalabra() {
    const palabras = this.palabrasService.palabras;

    let palabra = palabras[Math.floor(Math.random() * palabras.length)];
    this.prepararPalabra(palabra);
  }

  empezarJuego() {
    this.juegoIniciado = true;
    this.reiniciarIntentos();
    this.setearBotones(false);
    this.elegirPalabra();
    this.rondaIniciada = true;
    this.mensaje = '';
  }


  mostrarImagen() {
    return `./assets/juego-ahorcado/Ahorcado-${this.maximosIntentos - this.intentosRestantes}.png`;
  }

  setearBotones(estado: boolean) {
    this.letrasDeBotones = [];
    for (let index = 0; index < this.abecedario.length; index++) {
      const letra: LetraBoton = {
        caracter: this.abecedario[index],
        deshabilitado: estado
      }

      this.letrasDeBotones.push(letra);
    }
  }


  deshabilitarLetra(letra: string) {
    for (let index = 0; index < this.letrasDeBotones.length; index++) {
      let letraActual = this.letrasDeBotones[index];
      if (letraActual.caracter == letra) {
        letraActual.deshabilitado = true;
      }
    }
  }

  adivinarLetra(letra: string) {

    this.deshabilitarLetra(letra);

    if (!this.verificarLetraEnPalabra(letra)) {
      this.intentosRestantes -= 1;
    } else {
      this.revelarLetra(letra);
    }
    this.verAvanceDeJuego();
  }

  prepararPalabra(palabra: string) {
    let escondida: LetraBoton[] = [];
    for (const letra of palabra) {
      const letraEscondida: LetraBoton = {
        caracter: letra,
        deshabilitado: true
      }
      escondida.push(letraEscondida);
    }
    this.palabraEscondida = escondida;
  }



  verificarLetraEnPalabra(letraBuscada: string) {
    for (const letra of this.palabraEscondida) {
      if (letra.caracter === letraBuscada) {
        return true;
      }
    }
    return false;
  }


  revelarLetra(letra: string) {
    for (const index in this.palabraEscondida) {
      if (this.palabraEscondida[index].caracter === letra) {
        this.palabraEscondida[index].deshabilitado = false;
      }
    }
  }

  verAvanceDeJuego() {
    if (this.ganaJuego()) {
      this.mensaje = `Ganaste!!! La palabra era ${this.obtenerPalabraEscondida()}.`;
      this.rondasJugadas++;
      this.cerrarJuego();
    }

    if (this.pierdeJuego()) {
      this.mensaje = `Perdiste.La palabra era ${this.obtenerPalabraEscondida()}.`;
      this._regPuntajeService.agregarRegistro(this.rondasJugadas,'ahorcado');
      this.cerrarJuego();
    }
  }


  obtenerPalabraEscondida() {
    let palabra = "";
    for (const letra of this.palabraEscondida) {
      palabra += letra.caracter;
    }
    return palabra;
  }


  ganaJuego() {
    for (const letra of this.palabraEscondida) {
      if (letra.deshabilitado) {
        return false;
      }
    }
    return true;
  }

  pierdeJuego() {
    return this.intentosRestantes <= 0;
  }

  mostrarLetrasEncontradas() {
    let letrasEncontradas = "";
    for (const letra of this.palabraEscondida) {
      if (letra.deshabilitado) {
        letrasEncontradas += this.caracterOculto;
      } else {
        letrasEncontradas += letra.caracter;
      }
      letrasEncontradas += " ";
    }
    return letrasEncontradas;
  }


  reiniciarIntentos() {
    this.intentosRestantes = this.maximosIntentos;
  }

  cerrarJuego() {
    this.rondaIniciada = false;
    this.setearBotones(true);
  }

  terminarJuego(){
    this.cerrarJuego();
    this.mensaje='Se guardó tu puntuación.';
    this._regPuntajeService.agregarRegistro(this.rondasJugadas,'ahorcado');
  }

}
