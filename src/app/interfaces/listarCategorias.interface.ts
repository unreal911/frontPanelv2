export interface ListarCategoria {
  total: number;
  results: Result[];
}
export interface Result {
  nombre: string;
  usuario: string;
  estado: string;
  img: Img;
  uid: string;
}
export interface Img {
  id: string;
  url: string;
}
