import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: object,
        public rol?: string,
        public uid?: string,
        public estado?:boolean
    ) {}
}

