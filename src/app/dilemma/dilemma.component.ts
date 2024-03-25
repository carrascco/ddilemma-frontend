import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AppComponent } from '../app.component';
import { DataServices } from '../data.services';
import { NoticiaComponent } from '../noticia/noticia.component';
import { Dilema, Votos } from '../types';
import { CookieService } from 'ngx-cookie-service';


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
  imports: [CommonModule, AppComponent, NoticiaComponent],
})
export class DilemmaComponent implements OnChanges {
  @Input() dilemma: Dilema;
  idDilemma: number = 0;

  @Input() votos: Votos = { votosA: 0, votosB: 0, votosC: 0, votosD: 0 };

  //votosNumber se usa para guardar los votos como un array de numeros
  votosNumber: number[] = [];

  respuestas: any[] = [];
  dilema: string = 'Dilema de la semana';

  clickedButton: any = null;
  buttonClicked: boolean = false;

  buttons: Button[] = [];

  constructor(
    private cookieSvc: CookieService,
    private dataService: DataServices
  ) {
    this.dilemma = {
      id: 0,
      contenido: '',
      id_noticia: 0,
      fecha_generacion: '',
      respuestas: [],
    };
  }

  ngOnChanges(): void {
    //At UTC+0, all the cookies are reset
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    if (this.cookieSvc.get('date') !== `${day}/${month}`){
      this.cookieSvc.deleteAll();
    }

    this.respuestas = this.dilemma['respuestas'];
    this.dilema = this.dilemma['contenido'];
    if (this.buttons.length == 0) {
      this.insertRespuestas();
    }
    this.idDilemma = this.dilemma['id'];

    this.votosNumber[0] = this.votos['votosA'];
    this.votosNumber[1] = this.votos['votosB'];
    this.votosNumber[2] = this.votos['votosC'];
    this.votosNumber[3] = this.votos['votosD'];

    if (this.cookieSvc.get('voted') === 'true') {
      this.clickRespuesta(this.cookieSvc.get('respuesta'));
    }
    // if (this.votosNumber.length > 0 && this.percentage !== undefined) {
    //   this.calculatePercentages();
    // }
  }

  public calculatePercentages() {
    if (this.buttons.length === 0) {
      return;
    }
    let totalVotos = this.votosNumber.reduce((a, b) => a + b, 0);
    this.votosNumber.forEach((element: any, index: number) => {
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

  clickRespuesta(respuesta: any) {
    let enviar =false;
    if (this.cookieSvc.get('voted') !== 'true') {
      this.cookieSvc.set('voted', 'true');
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      this.cookieSvc.set('respuesta', respuesta.text);
      this.cookieSvc.set('date', `${day}/${month}`);
      this.clickedButton = respuesta.text;
      enviar=true;
    } else {
      
      this.clickedButton = respuesta;
    }
    this.buttonClicked = true;
    this.percentage = respuesta.percentage;

    //Manejar nuevo voto
    this.votosNumber[this.buttons.indexOf(respuesta)]++;
    this.calculatePercentages();
    if (enviar) {
      this.sendVotos();
    }
  }

  sendVotos() {
    //Send the new votes to the server
    this.votos.votosA = this.votosNumber[0];
    this.votos.votosB = this.votosNumber[1];
    this.votos.votosC = this.votosNumber[2];
    this.votos.votosD = this.votosNumber[3];

    this.dataService.actualizarVotos(this.votos).subscribe({
      next: (votos) => {},
      error: (error) => console.error('Error al actualizar votos: ', error),
    });
  }
}
