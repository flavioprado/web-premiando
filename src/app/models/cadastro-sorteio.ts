import { FormGroup } from "@angular/forms";

export class CadastroSorteio {
    id: number;
    dataEncerramento: string;
    dataSorteio: string;
    descricao: string;
    exibirData: boolean;
    imagem: string | ArrayBuffer;
    keywords: string;
    adicional1: string;
    adicional2: string;
    numeroFinal: number;
    numeroInicial: number;
    ocultar: boolean;
    rifinha: boolean;
    idSorteioRifinha: number;
    nomeSorteioRifinha: string;
    status: number;
    statusDescricao: string;
    texto: string;
    titulo: string;
    valor: number;
    whatsapp: string;

    getSorteioByForm( form: FormGroup, imagemBase64: string, texto: string): CadastroSorteio {
        this.id = form.controls['id'].value;
        this.dataEncerramento = form.controls['dataEncerramento'].value;
        this.dataSorteio = form.controls['dataSorteio'].value;
        this.descricao = form.controls['descricao'].value;
        this.exibirData = form.controls['exibirData'].value;
        this.imagem = imagemBase64;
        this.keywords = form.controls['keywords'].value;
        this.adicional1 = form.controls['adicional1'].value;
        this.adicional2 = form.controls['adicional2'].value;
        this.numeroFinal = form.controls['numeroFinal'].value;
        this.numeroInicial = form.controls['numeroInicial'].value;
        this.ocultar = form.controls['ocultar'].value;
        this.rifinha = form.controls['rifinha'].value;
        this.status = form.controls['status'].value;
        this.texto = texto;
        this.titulo = form.controls['titulo'].value;
        this.valor = form.controls['valor'].value;
        this.whatsapp = form.controls['whatsapp'].value;

        return this;
    }
}