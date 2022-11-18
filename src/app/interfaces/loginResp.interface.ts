export interface loginResp {
  ok: boolean;
  msg: string;
  usuarioDB: {};
  token: string;
}

export interface UsuarioDB {
  nombre: string;
  email: string;
  img: Img;
  rol: string;
  google: boolean;
  estado: boolean;
  uid: string;
}

export interface Img {
  id: string;
  url: string;
  original_filename: string;
}
