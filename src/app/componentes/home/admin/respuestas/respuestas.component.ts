import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../../services/firestore.service';
import { Encuesta } from '../../encuesta/interfaces/encuesta.interface';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.css']
})
export class RespuestasComponent implements OnInit {

  encuestas:Encuesta[]=[];

  constructor(private fireStore:FirestoreService) { }

  ngOnInit(): void {
    this.fireStore.obtenerEncuestas()
    .subscribe(resp => {
      this.encuestas = resp;
    })
  }

}
