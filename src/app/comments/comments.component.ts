import { Component } from '@angular/core';
import { DataServices } from '../data.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
  providers: [DataServices]
})
export class CommentsComponent {
[x: string]: any;

  constructor(private dataService: DataServices) { }

  cargarComments (){
    console.log(this.dataService.getComentarios());
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
}
