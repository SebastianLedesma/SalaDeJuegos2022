import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService {

  arrayDePalabras:string[]=[
    'mermelada','frutilla','durazno','tomate','calabaza','perejil','cebolla','zapallo','remolacha','jengibre','automovil','camioneta','bicicleta','cohete','crucero','colectivo','limusina',
    'computadora','auriculares','teclado','dispositivo','memoria','telefono','celular','parlantes','microfono','inalambrico',
    'libreria','cuaderno','lapicera','fotocopia','impresora','caramelo','abrochadora','linterna','almanaque','juguete','pasajero',
    'lavarropa','heladera','bocina','laboratorio','estanteria','mascota','arvejas','chocolate','antena','murcielago','zanahoria','serpiente','ornitorrinco','ardilla','iguana','carpincho','fotosintesis','oxigeno'
];

  get palabras(){
    return this.arrayDePalabras;
  }

  constructor() { }
}
