import { Component, OnInit } from '@angular/core'; // Importa OnInit
import { DataServices } from './data.services';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { last } from 'rxjs';
import { DilemmaComponent } from './dilemma/dilemma.component';
import { Dilema, Votos } from './types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule, HeaderComponent, DilemmaComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataServices] 
})
export class AppComponent implements OnInit { // Implementa OnInit
  //I want "Dilemma of the day" and the daily dilemma number to be displayed on the screen

  titulo = 'DailyDilemma';

  lastDilemma: Dilema ;

  votos: Votos = { votosA: 0, votosB: 0, votosC: 0, votosD: 0 } ;


  constructor(private dataService: DataServices) {
    this.lastDilemma = { id: 0, contenido: "", id_noticia: 0, fecha_generacion: "", respuestas: [] };
  }
  
  public static DATABASE_URL = 'http://localhost:3000/votos';
  
  ngOnInit() {
    this.cargarVotos();
    this.getLastDilemma();
   
    // let fecha_generacion = (this.lastDilemma as { id: number, contenido: string, id_noticia: number, fecha_generacion: string, respuestas: any[] })['fecha_generacion'];
    let fecha_generacion = this.lastDilemma?.fecha_generacion;
    
    // Create a new Date object from the date string
    let date;
    if(fecha_generacion){date = new Date(fecha_generacion);
    
    // Get the day and month
    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1; // Months are 0-based, so add 1
    
    // Format the day and month
    date = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}`;
  }
    this.titulo = "Dilema Diario " +date;
    
  }

  getLastDilemma(): void {
    this.dataService.getLastDilemma().subscribe(
      (data) => {
        this.lastDilemma = data[0];
      },
      (error) => {
        console.error(error);
      }
    );
  }
  



  cargarVotos() {
    this.dataService.cargarVotos().subscribe({
      next: (votos) => {
        this.votos = votos ; // Asegúrate de asignar 0 si es null/undefined
        console.log(this.votos);
      },
      error: (error) => console.error("Error al cargar votos: ", error)
    });
  }

  actualizarVotos() {
    this.dataService.actualizarVotos(this.votos).subscribe({
      next: () => console.log("Voto guardado correctamente"),
      error: (error) => console.error("Error al guardar voto: ", error)
    });
  }
}
