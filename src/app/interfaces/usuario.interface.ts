export interface listarUsuarios {
  ok:       boolean;
  msg:      string;
  Usuarios: Usuario[];
  total:    number;
  paginas:number
}

export interface Usuario {
  nombre: string;
  email:  string;
  img:    Img;
  rol:    string;
  google: boolean;
  estado: boolean;
  uid:    string;
}

export interface Img {
  id:                 string;
  url?:               string;
  original_filename?: string;
}
