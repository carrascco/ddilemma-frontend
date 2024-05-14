import { Component, Input } from '@angular/core';
import { DataServices } from '../data.services';
import { CommonModule } from '@angular/common';
import { Dilema, Noticia } from '../types';
import { Router } from '@angular/router';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-noticia',
  standalone: true,
  imports: [CommonModule, CommentsComponent],
  templateUrl: './noticia.component.html',
  styleUrl: './noticia.component.css', 
  providers: [DataServices]
})
export class NoticiaComponent {
  @Input() dilemma: Dilema = {
    contenido: '',
    fecha_generacion: '',
    id_noticia: 0,
    respuestas: [],
    votos: [],
    comentarios: []
  };

  //I want to display the news related to the dilemma of the day
  noticia: Noticia;
  
  parrafo1: string = '';
  parrafo2: string = '';
  

  viewNoticia: boolean = false;

  constructor(private dataService: DataServices, private router: Router) {
    this.noticia = { id: 0, url: "", titulo: "", cuerpo: "", fuente: "", url_imagen: "" };
  }

  ngOnInit() {
    this.retrieveNoticia();
  }

  retrieveNoticia() {
    console.log("Entrando en getNoticia");  
    this.dataService.getNoticia().subscribe((data) => {
      console.log(data);
      this.noticia = data[data.length - 1];

      const parts = this.noticia.cuerpo.split('.');
      this.parrafo1 = parts.slice(0, 2).join('.');
      this.parrafo2 = parts.slice(2).join('.');
    });

  }

  noticiaRetrieved() {
    this.viewNoticia = true;
    console.log(this.noticia);
    setTimeout(() => {
      this.scrollIntoNoticia();
    }, 250);
  
  }

  scrollIntoNoticia() {
    const elemento = document.getElementById('verNoticia');
    elemento?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  }
}
