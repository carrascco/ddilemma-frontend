import { Component, Input } from '@angular/core';
import { DataServices } from '../data.services';
import { CommonModule } from '@angular/common';
import { Noticia } from '../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noticia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './noticia.component.html',
  styleUrl: './noticia.component.css', 
  providers: [DataServices]
})
export class NoticiaComponent {
  @Input()idDilema: number = 0;

  //I want to display the news related to the dilemma of the day
  noticia: Noticia;
    

  viewNoticia: boolean = false;

  constructor(private dataService: DataServices, private router: Router) {
    this.noticia = { id: 0, url: "", titulo: "", cuerpo: "", fuente: "", url_imagen: "" };
  }

  ngOnChanges() {
    this.retrieveNoticia();
  }

  retrieveNoticia() {
    console.log("Entrando en getNoticia");
    this.dataService.getNoticia(this.idDilema).subscribe((data) => {
      console.log(data);
      this.noticia = data[0];
    });

  }

  noticiaRetrieved() {
    this.viewNoticia = true;
    console.log(this.noticia);
    setTimeout(() => {
      this.scrollIntoNoticia();
    }, 500);
  
  }

  scrollIntoNoticia() {
    const elemento = document.getElementById('noticiaElement');
    elemento?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
