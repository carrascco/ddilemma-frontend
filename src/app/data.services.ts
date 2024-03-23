import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from 'rxjs'; // Importa operadores RxJS según sea necesario
import { Dilema, Noticia, Votos } from "./types";

@Injectable({
  providedIn: 'root'
})
export class DataServices {
  private FIREBASE_URL = 'https://dailydilemma-61ac8-default-rtdb.europe-west1.firebasedatabase.app/votos.json';

  constructor(private httpClient: HttpClient) {}

  // -----------------------------------------------------------------------
  // ---------------------------------VOTOS---------------------------------
  cargarVotos(): Observable<Votos> {
    return this.httpClient.get<Votos>(this.FIREBASE_URL);
  }

  actualizarVotos(votos: Votos) {
    
    
    return this.httpClient.put(this.FIREBASE_URL, votos).pipe(
      catchError(error => {
        console.error("Error al guardar votos: ", error);
        return of(null); 
      })
    );
  }

  // ---------------------------------DILEMAS---------------------------------
  private apiUrl = 'https://stark-peak-62036-bec9579aee22.herokuapp.com/dilemas';
  // private apiUrl = 'http://localhost:3000/';
  
  getLastDilemma(): Observable<Dilema[]>{
    return this.httpClient.get<Dilema[]>(this.apiUrl+'dilemas');
  }


 // ---------------------------------NOTICIAS---------------------------------
  // private apiUrl = 'https://stark-peak-62036-bec9579aee22.herokuapp.com/noticias';
  
  getNoticia(id: number): Observable<Noticia[]>{
    return this.httpClient.get<Noticia[]>(this.apiUrl+'noticias/');
  }

  // // ---------------------COMENTARIOS---------------------
  // getComentarios():Observable<Comentario[]>{
  //   return this.httpClient.get<Comentario[]>(this.apiUrl+'comentarios');
  // }
}