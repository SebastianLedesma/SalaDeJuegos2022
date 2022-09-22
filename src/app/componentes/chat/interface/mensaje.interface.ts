import { Timestamp } from "@angular/fire/firestore";

export interface Mensaje{
    usuario:string,
    texto:string,
    fecha:Timestamp
}