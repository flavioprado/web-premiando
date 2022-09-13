import { FormGroup } from "@angular/forms";

export class AddContaBancaria {
    agencia: string;
    banco: number;
    bancoCompleto: string;
    digitoAgencia: string;
    digitoConta: string;
    id: number;
    imagem: string;
    nome:  string;
    numeroConta: string;
    tipoConta: string;
    tipoContaBancaria: string;
    titular: string;
    cpfOrCnpj: string;
    linkDePagamento: string;
    naoIncluirEmRelatorios: boolean;
    ocultarConta: boolean;


    getContaBancariaByFormGroup(form: FormGroup, imagemBase64: string): AddContaBancaria {
        this.agencia = form.controls['agencia'].value;
        this.banco = form.controls['banco'].value;
        this.digitoAgencia = form.controls['digitoAgencia'].value;
        this.digitoConta = form.controls['digitoConta'].value;
        this.imagem = imagemBase64;
        this.nome = form.controls['nome'].value;
        this.numeroConta = form.controls['numeroConta'].value;
        this.tipoConta = form.controls['tipoConta'].value;
        this.titular = form.controls['titular'].value;
        this.id = form.controls['id'].value;
        this.tipoContaBancaria = form.controls['tipoContaBancaria'].value;
        this.cpfOrCnpj = form.controls['cpfOrCnpj'].value;
        this.linkDePagamento = form.controls['linkDePagamento'].value;
        this.naoIncluirEmRelatorios = form.controls['naoIncluirEmRelatorios'].value;
        this.ocultarConta = form.controls['ocultarConta'].value;

        return this;
    }
}