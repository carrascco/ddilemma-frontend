import { Component } from '@angular/core';

@Component({
  selector: 'app-sharing',
  standalone: true,
  imports: [],
  templateUrl: './sharing.component.html',
  styleUrl: './sharing.component.css'
})
export class SharingComponent {
  
  url = 'https://daily-dilemma.netlify.app/';
  text = '¡Qué interesante! 😊 Echa un vistazo al dilema de la noticia de hoy 📰🔍: \n\n';

  constructor() { }

  shareOnWhatsApp() {
    // Crea el enlace de compartir para WhatsApp
    let whatsappUrl = `https://wa.me/?text=${encodeURIComponent(this.text + this.url)}`;

    // Abre WhatsApp en una nueva ventana con el enlace de compartir
    window.open(whatsappUrl, '_blank');
  }

  shareOnTwitter() {
    // Crea el enlace de compartir para Twitter
    let twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.text)}&url=${encodeURIComponent(this.url)}`;

    // Abre Twitter en una nueva ventana con el enlace de compartir
    window.open(twitterUrl, '_blank');
  }

  shareOnFacebook() {
    // Crea el enlace de compartir para Facebook
    let facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.url)}`;

    // Abre Facebook en una nueva ventana con el enlace de compartir
    window.open(facebookUrl, '_blank');
  }

  
}
