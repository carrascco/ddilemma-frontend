import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, from, map, Observable, of } from 'rxjs'; // Importa operadores RxJS según sea necesario
import { Comentario, Dilema, Noticia } from "./types";
import { environment } from "../environment/environment";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { AngularFireModule } from "@angular/fire/compat";
import { arrayUnion, collection, collectionData, doc, Firestore, setDoc, updateDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataServices {
  private FIREBASE_URL = environment.firebaseApiUrl;
  firestore=inject(Firestore);
  dilemasCollection = collection(this.firestore, 'dilemas')
  noticiasCollection = collection(this.firestore, 'noticias')
  
  
  constructor(private httpClient: HttpClient
    // , private _angularFireStore : AngularFirestore
    ) {}

  // -----------------------------------------------------------------------
  // ---------------------------------VOTOS---------------------------------
  // cargarVotos(): Observable<Votos> {
  //   // Añade un parámetro de cache-busting a la URL
  //   const urlConCacheBusting = `${this.FIREBASE_URL}?nocache=${new Date().getTime()}`;
  
  //   return this.httpClient.get<Votos>(urlConCacheBusting);
  // }

  // actualizarVotos(votos: Votos) {
  //   return this.httpClient.put(this.FIREBASE_URL, votos).pipe(
  //     catchError(error => {
  //       console.error("Error al guardar votos: ", error);
  //       return of(null); 
  //     })
  //   );
  // }

  // ---------------------------------DILEMAS---------------------------------
  private apiUrl = environment.backendApiUrl;
  // private apiUrl = 'http://localhost:3000/';

  getLastDilemma(): Observable<Dilema[]>{
    return collectionData(this.dilemasCollection).pipe(
      map(data => {
        console.log("Dilemas COLLECTION: ", data);

        return data as Dilema[];
      })
    ); 
    // console.log("Entrando en getLastDilemma (DATA)");
    // const urlDilemaConCacheBusting = `${this.apiUrl}dilemas?nocache=${new Date().getTime()}`;
    // return this.httpClient.get<Dilema[]>(urlDilemaConCacheBusting);
  }


  //"votos " is a field on the dilema document from the dilemas collection
  //Lets use the dilema id to update the votes field
  updateVotos(dilemaId: string, votos: number[]):Observable<void> {
    const dilemaRef = doc(this.firestore, 'dilemas/'+ dilemaId);
    const promise = updateDoc(dilemaRef, {votos: votos});
    return from(promise);
  }


 // ---------------------------------NOTICIAS---------------------------------
  // private apiUrl = 'https://stark-peak-62036-bec9579aee22.herokuapp.com/noticias';
  
  getNoticia(): Observable<Noticia[]>{
    return collectionData(this.noticiasCollection).pipe(
      map(data => {
        console.log("Noticias COLLECTION: ", data);
        
        return data as Noticia[];
      })
    );

    // const urlNoticiaConCacheBusting = `${this.apiUrl}noticias?nocache=${new Date().getTime()}`;
    // return this.httpClient.get<Noticia[]>(urlNoticiaConCacheBusting);
  }

  // // ---------------------COMENTARIOS---------------------

  postComentario(nombre:string, comment:string, dilemaId:string):Observable<void>{
    const comentario: Comentario = {
      usuario: nombre,
      contenido: comment,
      fecha: new Date().toISOString()
    }
    const dilemaRef = doc(this.firestore, 'dilemas/'+ dilemaId);
    const promise = updateDoc(dilemaRef, {comentarios: arrayUnion(comentario)});
    return from(promise);
  }
}