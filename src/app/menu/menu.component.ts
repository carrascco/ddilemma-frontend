import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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

  getTop5DilemmasByVotes(): Dilema[] {
    return this.allDilemmas
        .map(dilema => ({
            ...dilema,
            totalVotes: dilema.votos.reduce((acc, curr) => acc + curr, 0)
        }))
        .sort((a, b) => b.totalVotes - a.totalVotes)
        .slice(0, 5);
}

getTop5DilemmasByComments(): Dilema[] {
  return this.allDilemmas
      .map(dilema => ({
          ...dilema,
          totalComments: dilema.comentarios ? dilema.comentarios.length : 0
      }))
      .sort((a, b) => b.totalComments - a.totalComments)
      .slice(0, 5);
}

scrollToMostDilemmas() {
  const element = document.getElementById('mostsDilemmas');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
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
