import { Component, OnInit } from '@angular/core';
import { PersonajeService } from './services/personaje.service';
import { Result } from './interface/personaje.interface';



@Component({
  selector: 'app-preguntado',
  templateUrl: './preguntado.component.html',
  styleUrls: ['./preguntado.component.css']
})
export class PreguntadoComponent implements OnInit {

  mensaje: string = '';
  rondaIniciada: boolean = false;
  juegoIniciado: boolean = false;
  listadoPersonajes?: Result[] = [];
  personaje?: Result;
  imagenPath: string = '';
  arrayDeBotones: string[] = [];
  aciertos:number=0;

  constructor(private _personajeService: PersonajeService) { }

  ngOnInit(): void {
  }

  empezarJuego():void {
    this.setearJuego();
    this.obtenerListadoPersonajes();
  }


  obtenerListadoPersonajes():void {
    this._personajeService.obtenerPersonajes()
    .subscribe(resp => {
      this.listadoPersonajes = resp.data.results;
      this.obtenerPersonaje();
    });
  }

  obtenerPersonaje():void {
    const nroRandom = Math.floor(Math.random() * 4);
    this.personaje = this.listadoPersonajes![nroRandom];

    if(!this.personaje.thumbnail.path.endsWith('available')){
      this.imagenPath = this.personaje!.thumbnail.path.concat('.').concat(this.personaje!.thumbnail.extension);
      this.prepararBotones();
    }else{
      console.log('no tiene imagen.');
      this.obtenerPersonaje();
    }
  }


  prepararBotones():void {
    this.arrayDeBotones=[];
    this.listadoPersonajes = this.listadoPersonajes?.reverse();
    this.listadoPersonajes!.forEach(element => {
      this.arrayDeBotones.push(element.name);
    });
  }


  verRespuesta(nombre: string) {
    if(this.rondaIniciada){
      if (nombre === this.personaje?.name) {
        this.aciertos++;
        this.obtenerListadoPersonajes();
      } else {
        this.mensaje = `La respuesta era  ${this.personaje?.name}. Aciertos: ${this.aciertos}.`;
        this.rondaIniciada=false;
      }
    }
  }


  setearJuego():void{
    this.juegoIniciado = true;
    this.rondaIniciada = true;
    this.aciertos=0;
    this.mensaje = '';
    this.arrayDeBotones = [];
  }

}
