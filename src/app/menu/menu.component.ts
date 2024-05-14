import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dilema } from '../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  ngOnInit(): void {
    if(window.location.href.includes('/dilema')){
      this.movingAnimation=false;
    }
  }
  
  @Output() menuToggled = new EventEmitter<boolean>();
  @Input() allDilemmas: Dilema[]=[];

  showMenu: boolean = false;
  movingAnimation: boolean = true;

  toggleMenu() {
    this.showMenu = !this.showMenu;
    this.menuToggled.emit(this.showMenu); 
    this.movingAnimation=false;
  }

  

  getTitleOfDilemma(dilema: Dilema) {
    let fecha_generacion = dilema.fecha_generacion;
    let date;
    if (fecha_generacion) {
      date = new Date(fecha_generacion);
      let day = date.getUTCDate();
      let month = date.getUTCMonth() + 1;
      date = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}`;
    }
    return "Dilema Diario " + date;
  }
}
