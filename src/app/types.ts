export interface Dilema {
    contenido: string
    fecha_generacion: string
    id_noticia: number
    respuestas: string[]
    votos: number[]
    comentarios: Comentario[]
  }

  export interface Noticia {
    id: number
    url: string
    titulo: string
    cuerpo: string
    fuente: string
    url_imagen: string  
  }

  export interface Comentario {
    usuario : string
    contenido : string
    fecha : string
  }