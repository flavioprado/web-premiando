import { FormGroup } from "@angular/forms";

export class ContaBancaria {
    agencia: string;
    codigoBanco: number;
    digitoAgencia: string;
    digitoConta: string;
    id: number;
    imagem: string;
    nomeBanco:  string;
    numeroConta: string;
    tipoConta: string;
    titular: string;
    ativo: boolean;
    cpfOrCnpj: string;
    ocultarConta: boolean;
    linkPagamento: string;

    getCLientByFormGroup(form: FormGroup): ContaBancaria {
        this.agencia = form.controls['agencia'].value;
        this.codigoBanco = form.controls['codigoBanco'].value;
        this.digitoAgencia = form.controls['digitoAgencia'].value;
        this.digitoConta = form.controls['digitoConta'].value;
        this.imagem = form.controls['imagem'].value;
        this.nomeBanco = form.controls['nomeBanco'].value;
        this.numeroConta = form.controls['numeroConta'].value;
        this.tipoConta = form.controls['tipoConta'].value;
        this.titular = form.controls['titular'].value;
        this.id = form.controls['id'].value;
    
        return this;
    }
}