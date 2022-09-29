import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encuentra-el-fantasma',
  templateUrl: './encuentra-el-fantasma.component.html',
  styleUrls:['./encuentra-el-fantasma.component.css']
})
export class EncuentraElFantasmaComponent implements OnInit {

  with:number=400;
  height:number=400;
  puntoFantasmaEscondido:any={};

  cantidadClicks:number=0;
  mensaje:string='';
  juegoIniciado=false;
  rondaIniciada:boolean=false;
  pistasEnPantalla:string[]=[];

  constructor() { }

  ngOnInit(): void {
  }

  empezarJuego(){
    this.juegoIniciado=true;
    this.rondaIniciada=true;
    this.mensaje='';
    this.cantidadClicks=0;
    this.pistasEnPantalla=[];

    this.puntoFantasmaEscondido ={
      coorX:this.obtenerNroAleatorio(this.with),
      coorY:this.obtenerNroAleatorio(this.height)
    }

    console.log('Punto tesoro:  x=' +this.puntoFantasmaEscondido.coorX + '  y:' + this.puntoFantasmaEscondido.coorY);
  }


  //OBTENGO NUMERO ALEATORIO PARA UNO DE LAS COORDENADAS.
  obtenerNroAleatorio(limite:number):number{
    return Math.floor(Math.random() * limite);
  }

  //OBTENGO COORDENADAS DONDE SE HIZO CLICK.
  obtenerClick(event:any){
    if(this.rondaIniciada){
      let punto:any={
        coorX:Number,
        coorY:Number
      }
  
      punto={
        coorX:event.offsetX,
        coorY:event.offsetY
      }
  
      console.log('click en x=' + punto.coorX + ' y='+punto.coorY);
      this.verResultado(punto,this.puntoFantasmaEscondido);
    }
  }

  //CALCULA LA DISTANCIA ENTRE 2 PUNTOS.
  obtenerDistancia(puntoClick:any,coorTesoro:any){
    let distanciaX = puntoClick.coorX - coorTesoro.coorX;
    let distanciaY = puntoClick.coorY - coorTesoro.coorY;
    return Math.sqrt((distanciaX * distanciaX) + (distanciaY * distanciaY));
  }

  //RETORNA MENSAJE COMO PISTA.
  obtenerMensajeSegunDistancia(distancia:number):string{
    let pista:string='';
    if(distancia < 30){
      pista = 'Estas muy cerca';
    }else if(distancia < 40){
      pista = 'Estas cerca';
    }else if(distancia < 60){
      pista = 'cerca';
    }else if(distancia < 100){
      pista ='maso';
    }else if(distancia < 180){
      pista = 'lejos';
    }else if(distancia < 360){
      pista = 'muy lejos';
    }else{
      pista = 'miedoso';
    }

    return pista;
  }


  //REVELA RESPUESTA.
  verResultado(puntoClick:any,puntoTesoro:any){
    this.cantidadClicks++;
    let distancia:number = this.obtenerDistancia(puntoClick,puntoTesoro);

    console.log('distancia:',distancia);

    let pista:string = this.obtenerMensajeSegunDistancia(distancia);

    console.log(pista);
    if(distancia < 15){
      this.mensaje = `Encontraste el fantasma en ${this.cantidadClicks} clicks.`;
      this.rondaIniciada=false;
    }else{
      if(this.pistasEnPantalla.length == 14){
        this.pistasEnPantalla.shift();
      }
      this.pistasEnPantalla.push(pista);
    }
  }

}
