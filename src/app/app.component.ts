import { Component, OnInit } from '@angular/core'; // Importa OnInit
import { DataServices } from './data.services';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { last } from 'rxjs';
import { DilemmaComponent } from './dilemma/dilemma.component';
import { Dilema } from './types';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, CommonModule, FormsModule, HttpClientModule, HeaderComponent, DilemmaComponent,],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataServices, CookieService,] 
})
export class AppComponent implements OnInit { // Implementa OnInit
  //I want "Dilemma of the day" and the daily dilemma number to be displayed on the screen

  titulo = 'DailyDilemma';

  lastDilemma: Dilema ;


  constructor(private dataService: DataServices) {
    this.lastDilemma = { contenido: "", id_noticia: 0, fecha_generacion: "", respuestas: [], votos: [0, 0, 0, 0], comentarios: []}

  }
  
  
  ngOnInit() {

    this.getLastDilemma().then(() => {
      let fecha_generacion = this.lastDilemma?.fecha_generacion;
      let date;
      if (fecha_generacion) {
        date = new Date(fecha_generacion);
        let day = date.getUTCDate();
        let month = date.getUTCMonth() + 1;
        date = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}`;
      }
      this.titulo = "Dilema Diario " + date;
      
    });
    // this.cargarVotos();
    
  }

  getLastDilemma(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.dataService.getLastDilemma().subscribe(
        (data) => {
          
          this.lastDilemma = data[data.length-1];
          resolve(data);
        },
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    });
  }
  



  // cargarVotos() {
  //   this.dataService.cargarVotos().subscribe({
  //     next: (votos) => {
  //       this.votos = votos ; // Asegúrate de asignar 0 si es null/undefined
  //       console.log("VOTOS CARGADOS: ",this.votos);
  //     },
  //     error: (error) => console.error("Error al cargar votos: ", error)
  //   });
  // }

  // actualizarVotos() {
  //   this.dataService.actualizarVotos(this.votos).subscribe({
  //     next: () => console.log("Voto guardado correctamente"),
  //     error: (error) => console.error("Error al guardar voto: ", error)
  //   });
  // }
}
