import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncuestaService } from './services/encuesta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  public formulario!:FormGroup;

  constructor(private _formBuilder:FormBuilder,private _encuestaService:EncuestaService,private _router:Router) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(){
    this.formulario = this._formBuilder.group({
      'nombre' :['',[Validators.required]],
      'apellido':['',Validators.required],
      'edad':[,[Validators.required,Validators.min(18),Validators.max(99)]],
      'telefono':['',[Validators.required,Validators.pattern("^[0-9]+$"),Validators.maxLength(10)]],
      'recomendacion':['',Validators.required],
      'mejoras': ['',Validators.required],
      'novedades': ['',Validators.required]

    });
  }

  enviar(){
    this._encuestaService.agregarEncuesta(this.formulario.value);
    this._router.navigate(['/home']);
  }

}
