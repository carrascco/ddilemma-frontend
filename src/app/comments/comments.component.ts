import { Component, Input } from '@angular/core';
import { DataServices } from '../data.services';
import { CommonModule } from '@angular/common';
import { Comentario, Dilema } from '../types';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
  providers: [DataServices]
})
export class CommentsComponent {
  @Input() dilemma: Dilema ={
    contenido: '',
    fecha_generacion: '',
    id_noticia: 0,
    respuestas: [],
    votos: [],
    comentarios: []
  };
  fechaToText:string='';

  comentarios: Comentario[]=[];
  constructor(private dataService: DataServices) { }
  
  ngOnChanges(){
 }


  showFirstInput: boolean = true;
  showAdditionalInputs: boolean = false;

  toggleInputs() {
    this.showFirstInput = false;
    this.showAdditionalInputs = true;

    setTimeout(() => {
      const inputElement = document.getElementById('name-input');
      if (inputElement) {
      inputElement.focus();
      }
    }, 0);
  
  }


  onNameBlur(){
    setTimeout(() => {
      const inputElement = document.getElementById('name-input') as HTMLInputElement;
      const textAreaElement = document.getElementById('comment-textarea') as HTMLTextAreaElement;
      if (inputElement && inputElement.value.trim() === '' && textAreaElement && textAreaElement.value.trim() === '') {
        if (textAreaElement && document.activeElement === textAreaElement) {
          // Code to execute if the textAreaElement is focused
        } else {
          this.showFirstInput = true;
          this.showAdditionalInputs = false;
        }
      }
    }, 100);
  }
  onCommBlur(){
    setTimeout(() => {
      const inputElement = document.getElementById('name-input') as HTMLInputElement;
      const textAreaElement = document.getElementById('comment-textarea') as HTMLTextAreaElement;
      if (textAreaElement && textAreaElement.value.trim() === '' && inputElement && inputElement.value.trim() === '') {
        if (inputElement && document.activeElement === inputElement) {
          // Code to execute if the inputElement is focused
        } else {
          this.showFirstInput = true;
          this.showAdditionalInputs = false;
        }
      }
    }, 100);
  }
  postComentario(){
    const inputElement = document.getElementById('name-input') as HTMLInputElement;
    const textAreaElement = document.getElementById('comment-textarea') as HTMLTextAreaElement;
    if (inputElement && textAreaElement) {
      const name = inputElement.value.trim();
      const comment = textAreaElement.value.trim();
      if (name && comment) {
        this.dataService.postComentario(name, comment, this.dilemma['fecha_generacion']);
        this.showFirstInput = true;
        this.showAdditionalInputs = false;
        inputElement.value = '';
        textAreaElement.value = '';
        }
      
    }
  }
  fechaToString(fechastr:string){
    const fecha = new Date(fechastr);
    const day = fecha.getDate();
    console.log(this.dilemma.fecha_generacion)
    const month = fecha.getMonth() + 1;
    const year = fecha.getFullYear();
    const hours = fecha.getHours();
    const minutes = fecha.getMinutes();
    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year} a las ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
   
  }
}
