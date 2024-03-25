import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from 'rxjs'; // Importa operadores RxJS según sea necesario
import { Dilema, Noticia, Votos } from "./types";
import { environment } from "../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class DataServices {
  private FIREBASE_URL = environment.firebaseApiUrl;

  constructor(private httpClient: HttpClient) {}

  // -----------------------------------------------------------------------
  // ---------------------------------VOTOS---------------------------------
  cargarVotos(): Observable<Votos> {
    // Añade un parámetro de cache-busting a la URL
    const urlConCacheBusting = `${this.FIREBASE_URL}?nocache=${new Date().getTime()}`;
  
    return this.httpClient.get<Votos>(urlConCacheBusting);
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
  private apiUrl = environment.backendApiUrl;
  // private apiUrl = 'http://localhost:3000/';

  getLastDilemma(): Observable<Dilema[]>{
    console.log("Entrando en getLastDilemma (DATA)");
    const urlDilemaConCacheBusting = `${this.apiUrl}dilemas?nocache=${new Date().getTime()}`;
    return this.httpClient.get<Dilema[]>(urlDilemaConCacheBusting);
  }


 // ---------------------------------NOTICIAS---------------------------------
  // private apiUrl = 'https://stark-peak-62036-bec9579aee22.herokuapp.com/noticias';
  
  getNoticia(id: number): Observable<Noticia[]>{
    const urlNoticiaConCacheBusting = `${this.apiUrl}noticias?nocache=${new Date().getTime()}`;
    return this.httpClient.get<Noticia[]>(urlNoticiaConCacheBusting);
  }

  // // ---------------------COMENTARIOS---------------------
  // getComentarios():Observable<Comentario[]>{
  //   return this.httpClient.get<Comentario[]>(this.apiUrl+'comentarios');
  // }
}