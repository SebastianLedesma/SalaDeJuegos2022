import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personaje } from '../interface/personaje.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonajeService {

  url: string = 'https://gateway.marvel.com:443/v1/public/characters?';
  apiKey: string = '83008ba5d0f5d0bb6df069c727ad272d';
  hash: string = 'fa4b43b86a6853ce86c020b1ed32a071';
  ts: number = 1;
  letraInicial: string = '';
  limite: number = 4;

  abecedario: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  constructor(private _http: HttpClient) { }

  obtenerPersonajes() {
    let nroRandom = Math.floor(Math.random() * 26);
    this.letraInicial = this.abecedario[nroRandom];

    nroRandom = Math.floor(Math.random() * 2);

    let urlConParametros: string = '';

    if (nroRandom == 0) {
      urlConParametros = `${this.url}nameStartsWith=${this.letraInicial}&limit=${this.limite}&ts=${this.ts}&apikey=${this.apiKey}&hash=${this.hash}`
    } else {
      urlConParametros = `${this.url}nameStartsWith=${this.letraInicial}&orderBy=-name&limit=${this.limite}&ts=${this.ts}&apikey=${this.apiKey}&hash=${this.hash}`
    }

    return this._http.get<Personaje>(urlConParametros);
  }
}
