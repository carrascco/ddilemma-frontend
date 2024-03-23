import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AppComponent } from '../app.component';
import { DataServices } from '../data.services';
import { NoticiaComponent } from '../noticia/noticia.component';
import { Dilema, Votos } from '../types';


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
    imports: [CommonModule, AppComponent, NoticiaComponent]
})



export class DilemmaComponent implements OnChanges{
[x: string]: any;

  @Input() dilemma: Dilema;
  idDilemma: number = 0;

  @Input() votos: Votos;

  //localVotos se usa para guardar los votos como un array de numeros
  localVotos: number[] =[];

  respuestas: any[] = [];
  dilema: string= "Dilema de la semana";

  clickedButton: any = null;
  buttonClicked: boolean = false;

  buttons: Button[] = [ ];

  constructor(private dataService: DataServices){ this.dilemma= { id: 0, contenido: "", id_noticia: 0, fecha_generacion: "", respuestas: []};
    this.votos= { votosA: 0, votosB: 0, votosC: 0, votosD: 0 }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.respuestas= this.dilemma['respuestas'];
    this.dilema= this.dilemma['contenido'];
    this.insertRespuestas();
    this.idDilemma = this.dilemma['id'];
    
    this.localVotos.push(this.votos['votosA']);
    this.localVotos.push(this.votos['votosB']);
    this.localVotos.push(this.votos['votosC']);
    this.localVotos.push(this.votos['votosD']);
    if(this.localVotos.length>0 && this.percentage !== undefined){
      this.calculatePercentages();
    }

  }
  
  public calculatePercentages(){
    if (this.buttons.length === 0 ) {
      return;
    }
    let totalVotos = this.localVotos.reduce((a, b) => a + b, 0);
    this.localVotos.forEach((element: any, index: number) => {        
      this.buttons[index].percentage = parseFloat(((element/totalVotos)*100).toFixed(2));
    });
  }

  // Insert the respuestas items into the buttons array
  
  insertRespuestas(){
    this.respuestas.forEach((element: any) => {
      this.buttons.push({text: element, percentage: 25});
    });
  }
  
  percentage:number= 0;

  clickRespuesta(respuesta: any){
    console.log("¡CLICK! Respuesta: "+respuesta);

    this.clickedButton = respuesta;
    this.buttonClicked = true;
    this.percentage = respuesta.percentage;

    //Manejar nuevo voto
    this.localVotos[this.buttons.indexOf(respuesta)]++;
    this.calculatePercentages();
    this.sendVotos();
    // console.log("Llamando a startLoading")
    // this.loadingComponent.startLoading(100);
  }

  sendVotos(){
    //Send the new votes to the server
    this.votos.votosA = this.localVotos[0];
    this.votos.votosB = this.localVotos[1];
    this.votos.votosC = this.localVotos[2];
    this.votos.votosD = this.localVotos[3];

    this.dataService.actualizarVotos(this.votos).subscribe({
      next: (votos) => {
        console.log("Votos actualizados correctamente: ", votos);
      },
      error: (error) => console.error("Error al actualizar votos: ", error)
    });
  }
  

}
