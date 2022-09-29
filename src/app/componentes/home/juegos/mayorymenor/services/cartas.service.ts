import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card, Carta } from '../interface/carta.interface';

@Injectable({
  providedIn: 'root'
})
export class CartasService {

  cartaActual?:Card;
  deckId: string = 'omqujups4bjt';
  url: string = 'https://deckofcardsapi.com/api/deck';

  constructor(private _http: HttpClient) { }


  obtenerCarta() {
    this.mezclarCartas();
    return this._http.get<Carta>(`${this.url}/${this.deckId}/draw/?count=1`);
  }


  mezclarCartas() {
    this._http.get<Carta>(`${this.url}/${this.deckId}/shuffle/?deck_count=1`)
    .subscribe(resp =>{
      console.log('mezcladas');
    });
  }
}
