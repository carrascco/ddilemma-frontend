import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AppComponent } from '../app.component';
import { DataServices } from '../data.services';
import { NoticiaComponent } from '../noticia/noticia.component';
import { Dilema } from '../types';
import { CookieService } from 'ngx-cookie-service';
import { MenuComponent } from '../menu/menu.component';
import { ActivatedRoute } from '@angular/router';


interface Button {

  text: string;

  percentage: number;

}
@Component({
  selector: 'app-dilemma',
  standalone: true,
  templateUrl: './dilemma.component.html',
  styleUrl: './dilemma.component.css',
  providers: [DataServices, NoticiaComponent],
  imports: [CommonModule, AppComponent, NoticiaComponent, MenuComponent],
})
export class DilemmaComponent implements OnChanges {
  @Input() dilemma: Dilema;
  @Input() allDilemmas: Dilema[]=[];
  @Input() dilemmaIndex: number = 0;
  idDilemma: string = '';
  showMenuButton: boolean = false;
  respuestas: any[] = [];
  dilema: string = 'Dilema de la semana';

  clickedButton: any = null;
  buttonClicked: boolean = false;

  buttons: Button[] = [];
  votos: number[] = [0, 0, 0, 0];

  constructor(
    private cookieSvc: CookieService,
    private dataService: DataServices
  ) {
    this.dilemma = {
      contenido: '',
      id_noticia: 0,
      fecha_generacion: '',
      respuestas: [],
      votos: [0, 0, 0, 0],
      comentarios: []
    };
  }

  ngOnChanges(): void {

    if (!window.location.href.includes('/dilema')) {
      if (this.dilemma.fecha_generacion&&(this.cookieSvc.get('date') !== this.dilemma['fecha_generacion'])) {
        console.log("ENTRO A BORRAR, COMPARACIÓN: ",this.cookieSvc.get('date'),this.dilemma['fecha_generacion'])
        this.cookieSvc.deleteAll();
      }
    }else{this.showMenuButton=true;}
    
    this.respuestas = this.dilemma['respuestas'];
    this.dilema = this.dilemma['contenido'];
    if (this.buttons.length == 0) {
      this.insertRespuestas();
    }
    this.idDilemma = this.dilemma['fecha_generacion'];

    this.votos=this.dilemma['votos'];
    
      if (this.cookieSvc.get('voted') === 'true' && this.dilemma!==undefined && this.dilemma!==null && !window.location.href.includes('/dilema')) {
          this.clickRespuesta(this.cookieSvc.get('respuesta'), false);
      }
      if(window.location.href.includes('/dilema')){
        this.showMenuButton=true;
        if(this.buttonClicked==false){
          this.clickRespuesta(this.cookieSvc.get('respuesta'), false);
        }
      }
    
    // if (this.votosNumber.length > 0 && this.percentage !== undefined) {
    //   this.calculatePercentages();
    // }
  }

  public calculatePercentages() {
    if (this.buttons.length === 0) {
      return;
    }
    let totalVotos = this.votos.reduce((sum, value) => sum + value, 0);
    this.votos.forEach((element: any, index: number) => {
      if(index>=this.buttons.length) return;
      this.buttons[index].percentage = parseFloat(
        ((element / totalVotos) * 100).toFixed(2)
      );
    });
  }

  // Insert the respuestas items into the buttons array

  insertRespuestas() {
    this.respuestas.forEach((element: any) => {
      this.buttons.push({ text: element, percentage: 25 });
    });
  }

  percentage: number = 0;

  clickRespuesta(respuesta: any, reallyAClick: boolean = true) {
    let enviar =false;
    if (this.cookieSvc.get('voted') !== 'true') {
      this.cookieSvc.set('voted', 'true');
      const currentDate = new Date();
      
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      this.cookieSvc.set('respuesta', respuesta.text);
      this.cookieSvc.set('date', this.dilemma['fecha_generacion']);
      this.clickedButton = respuesta.text;
      enviar=true;
    } else {
      
      this.clickedButton = respuesta;
    }

    if (reallyAClick || !window.location.href.includes('/dilema') ) {
      this.buttonClicked = true;
      this.showMenuButton=true;
    }
    this.percentage = respuesta.percentage;

    //Manejar nuevo voto
    this.votos[this.buttons.indexOf(respuesta)]++;
    this.calculatePercentages();
    if (!this.votoEnviado && (enviar || window.location.href.includes('/dilema') && reallyAClick)) {
      setTimeout(() => {
      this.sendVotos();
      this.votoEnviado = true;
      }, 500);
    }
    setTimeout(() => {
      if(reallyAClick)
        this.scrollIntoPercentages();
      
    }
    , 250);
  }
//   setTimeout(() => {
//     this.scrollIntoNoticia();
//   }, 500);

// }
votoEnviado: boolean = false;

scrollIntoPercentages() {
  const elemento = document.getElementById('app-noticia');
  elemento?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


isMenuOpen = false;
  
handleMenuToggle(isOpen: boolean) {
  this.isMenuOpen = isOpen;
}

sendVotos() {
    this.dataService.updateVotos(this.dilemma['fecha_generacion'],this.votos).subscribe({
      next: (votos) => {},
      error: (error) => console.error('Error al actualizar votos: ', error),
    });
  }
}
