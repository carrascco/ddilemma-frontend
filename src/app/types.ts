export interface Dilema {
    id: number
    contenido: string
    respuestas: string[]
    fecha_generacion: string
    id_noticia: number
  }

  export interface Noticia {
    id: number
    url: string
    titulo: string
    cuerpo: string
    fuente: string
    url_imagen: string  
  }

  export interface Votos {
    votosA: number
    votosB: number
    votosC: number
    votosD: number
  }

  export interface Comentario {
    usuario : string
    contenido : string
    fecha : string
  }