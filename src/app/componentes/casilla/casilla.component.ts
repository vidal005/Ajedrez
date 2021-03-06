import { Component, OnInit, Input } from '@angular/core';
import { Casilla } from 'src/app/modelo/casilla';
import { ServiceService } from 'src/app/servicio/service.service';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { WebSocketService } from 'src/app/servicio/web-socket.service';

@Component({
  selector: 'app-casilla',
  templateUrl: './casilla.component.html',
  styleUrls: ['./casilla.component.css']
})
export class CasillaComponent implements OnInit {

  @Input() casilla:Casilla;
  constructor(public servicio : ServiceService) { }

  ngOnInit(): void {
  }

  onClickMe(posicion:number){
    var movimientos = this.servicio.getPosiblesPosiciones(posicion);
    var casillas = this.servicio.casillas;
    casillas.forEach(element => {
      element.resaltar = "null";
    });
    casillas[posicion].resaltar = "green-select";
    for (let index = 0; index < movimientos.length; index++) {
      var casilla = casillas[movimientos[index]];
      if(casilla.pieza != null){
        casilla.resaltar = "green-select";
      }
      else{
        casilla.resaltar = "green";
      }
      console.log(movimientos[index]);
    }
  }

  onDragStart(ev, posicion){
    var casillas = this.servicio.casillas;
    casillas.forEach(element => {
      element.resaltar = "null";
    });
    console.log(ev.target);

    var movimientos = this.servicio.getPosiblesPosiciones(posicion);
    casillas[posicion].resaltar = "green-select";
    for (let index = 0; index < movimientos.length; index++) {
      var casilla = casillas[movimientos[index]];
      if(casilla.pieza != null){
        casilla.resaltar = "green-select";
      }
      else{
        casilla.resaltar = "green";
      }
      console.log(movimientos[index]);
      ev.dataTransfer.setData("posicion", ev.target.parentElement.id)
    }
  }

  onDrop(ev){
    ev.preventDefault();
    let movimientos: number[];
    movimientos = this.servicio.getPosiblesPosiciones(ev.dataTransfer.getData("posicion"));
    console.log(ev.target.parentElement);
    let casilla = movimientos.find(element => element == ev.target.parentElement.id);
    console.log(casilla);
    if(casilla){
      this.servicio.casillas[casilla].pieza = this.servicio.casillas[ev.dataTransfer.getData("posicion")].pieza;
      this.servicio.casillas[ev.dataTransfer.getData("posicion")].pieza = null;
    }
    
    var casillas = this.servicio.casillas;
    casillas.forEach(element => {
      element.resaltar = "null";
    });
    console.log("onDrop");
  }

  onDragOver(ev){
    ev.preventDefault();
    console.log("onDragover");
  }
}
