import { Usuario } from "app/models/usuario";

export class ClienteJwt{
    id: string;
    nome: string;
    cpf: string;
    telefone: string;
    celular: string;
    whatsapp: string;
    //endereco: Endereco;
    usuario: Usuario;
    cotas: string[];
    foto: string;
}