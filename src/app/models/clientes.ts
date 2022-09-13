import { FormGroup } from "@angular/forms";
import { Endereco } from "./endereco";
import { Usuario } from "./usuario";

export class Clientes {
  id: number;
  nome: string;
  cpf: string;
  celular: string;
  telefone: string;
  whatsapp: string;
  endereco: Endereco;
  usuario: Usuario;
  foto: string;

  getCLientByFormGroup(form: FormGroup): Clientes {
    this.nome = form.controls['nome'].value;
    this.cpf = form.controls['cpf'].value;
    this.celular = form.controls['celular'].value;
    this.telefone = form.controls['telefone'].value;
    this.whatsapp = form.controls['whatsapp'].value;
    this.endereco = form.controls['endereco'].value;
    this.usuario = form.controls['usuario'].value;
    this.foto = form.controls['foto'].value;
    this.id = form.controls['id'].value;

    return this;
  }

  getCLientPagePrincipalByFormGroup(form: FormGroup): Clientes {
    this.nome = form.controls['nome'].value;
    this.cpf = form.controls['cpf'].value;
    this.celular = form.controls['celular'].value;
    this.usuario = form.controls['usuario'].value;
    this.id = form.controls['id'].value;

    return this;
  }

  getFormGroupByCLiente(form: FormGroup): FormGroup {
    form.controls['nome'].setValue(this.nome);
    form.controls['cpf'].setValue(this.cpf);
    form.controls['celular'].setValue(this.celular);
    form.controls['telefone'].setValue(this.telefone);
    form.controls['whatsapp'].setValue(this.whatsapp);
    form.controls['endereco'].setValue(this.endereco);
    form.controls['usuario'].setValue(this.usuario);
    form.controls['foto'].setValue(this.foto);

    return form;
  }
}
