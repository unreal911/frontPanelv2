export interface CargarUsuarios {
  total:    number;
  usuarios: Usuario[];
}

export interface Usuario {
  nombre: string;
  email:  string;
  img:    Img;
  rol:    string;
  estado: boolean;
  uid:    string;
}

export interface Img {
  id:  string;
  url: string;
}
