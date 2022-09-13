import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CadastroSorteio } from 'app/models/cadastro-sorteio';
import { FullSorteio } from 'app/models/full-sorteio';
import { Sorteio } from 'app/models/sorteio';
import { StatusSorteio } from 'app/models/status-sorteio';
import { SorteioService } from 'app/services/sorteio.service';
import { NotificationService } from 'app/services/toast.service';
import { UploadService } from 'app/services/upload.service';

@Component({
  selector: 'sorteios',
  templateUrl: './sorteios.component.html',
  styleUrls: ['./sorteios.component.css']
})
export class SorteiosComponent implements OnInit {

  @Input() public htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    sanitize: false,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['subscript']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  listStatusSorteio: StatusSorteio[];
  operacao: boolean = true;

  listaSorteios: Sorteio[];
  listaSorteiosRifinha: Sorteio[];
  sorteio: CadastroSorteio | FullSorteio;

  nameFilter: string;

  numeroCota: number;

  fileName = '';
  arquivo: string;

  key: string = 'id'; // Define um valor padrão, para quando inicializar o componente
  reverse: boolean = true;
  public paginaAtual = 1;

  constructor(private alertService: NotificationService,private sorteioService: SorteioService, 
              private router: Router, private route: ActivatedRoute, private uploadService: UploadService) { }

  ngOnInit(): void {
    this.sorteio = new CadastroSorteio();
    this.sorteioService.listSorteioStatus().subscribe(
      status => this.listStatusSorteio = status
    )
    this.loadSorteios();
  }

  private loadSorteios(): Promise<Sorteio[]>{
    return this.sorteioService.list().toPromise()
      .then(
        (sorteios) => {
          this.listaSorteios = sorteios['content'];
          this.listaSorteiosRifinha = sorteios['content'].filter(sorteio => !sorteio.rifinha)
          return sorteios['content'];
        },
        err => console.log(err)
      );
  }

  loadEditSorteio(id: number){
    if(id){
      this.sorteioService.getById(id).subscribe(
        sorteio => {
          this.sorteio = sorteio
          this.htmlContent = atob(sorteio.texto)
          if(this.sorteio.rifinha){
            let listTempSorteioRfinha: Sorteio[]  = this.listaSorteiosRifinha.filter(s => s.id === this.sorteio.idSorteioRifinha)
            this.sorteio.nomeSorteioRifinha = listTempSorteioRfinha[0].titulo;
          }
        }
      )
    } else {
      this.sorteio = new CadastroSorteio();
    }
  }

  setStatus(status: StatusSorteio){
    this.sorteio.status = status.id;
    this.sorteio.statusDescricao = status.descricao;
  }

  setSorteioRifinha(sorteioRifinha: CadastroSorteio){
    this.sorteio.idSorteioRifinha = sorteioRifinha.id;
    this.sorteio.nomeSorteioRifinha = sorteioRifinha.titulo;
  }

  atualizarListaEFiltrar() {
    this.loadSorteios().then(lista => this.searchSorteio(this.nameFilter, lista));
  }

  searchSorteio(name: string, listaSorteios: Sorteio[]){
    let filteredList: Sorteio[] = listaSorteios;

    if (name != undefined && name != null && name != '') {
      filteredList = filteredList.filter(sorteio => sorteio.titulo.toLowerCase().startsWith(name.toLowerCase()));
    }

    this.listaSorteios = filteredList;
  }

  clearFilterSearchName() {
    this.nameFilter = '';
  }

  setSorteioId(id: number){
    this.sorteio = new CadastroSorteio();
    this.arquivo = '';
    this.fileName = '';
    this.sorteio.id = id;
  }

  definir(){
    this.sorteioService.definirGanhador(this.sorteio.id, this.numeroCota).toPromise()
    .then(() => {
      this.alertService.showSucess('Ganhador definido com sucesso!', 'Sucesso');
      document.getElementById('closeModalDefinirGanhador').click();
      this.loadSorteios();
    })
    .catch(error => {
      this.alertService.showError('Erro ao definir ganhador!', 'Error')
    });
  }

  baixarLista(idSorteio: number, nomeSorteio: string) {
    this.sorteioService.downloadPDF(idSorteio, nomeSorteio).subscribe(
      result => this.downloadFile(result, nomeSorteio),
      (err) => {this.alertService.showWarning('Listagem Vazia', 'Não há compradores para o Sorteio.')}
    )
  }

  downloadFile(data: any, nomeSorteio: string) {
    const blob = new Blob([data], { type: 'application/pdf'});
    const url = window.URL.createObjectURL(data);
    var a = document.createElement("a");
    a.href = url;
    a.target = '_blank';
    a.download    = nomeSorteio + '.pdf';
    document.body.appendChild(a);
    a.click();
  }

  openPageSorteio(nomeSorteio:string, idSorteio: number) {
    this.router.navigate([]).then(result => {  window.open('#/sorteioAtivo/' + nomeSorteio.replaceAll(' ','-') + '/' + idSorteio, '_blank'); });
  }

  delete(id: number) {
    this.sorteioService.delete(id).subscribe({
      next: data => {
        this.alertService.showSucess("Sorteio deletado com sucesso!!", "Sucesso");
        this.loadSorteios()
      },
      error: error => {
        this.alertService.showError("Erro ao tentar excluir o sorteio! entre em contato com o adm.", "Erro");
        console.log(error);
      }
    });
  }

  getClassLabelStatus(description: string) {
    if (description === 'Ativa') {
      return 'label-status-aprovado'
    }
    if (description === 'Concluida') {
      return 'label-status-aprovado'
    }
    if (description === 'Cancelado') {
      return 'label-status-cancelado'
    }
    if (description === 'Pendente') {
      return 'label-status-pendente'
    }
  }

  async fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        this.fileName = file.name;
        this.arquivo = event.target.files[0];
    }
}

saveOrUpdate() {
  if (this.sorteio.id && this.sorteio.id > 0) {
    this.atualizar();
  } else {
    this.salvar();
  }
}

atualizar() {
  this.sorteio.texto = btoa(this.htmlContent)
  this.sorteio.imagem = this.fileName
  this.sorteioService.update(this.sorteio).toPromise()
    .then(() => {
      this.alertService.showSucess('Sorteio cadastrado com sucesso!', 'Sucesso')
        document.getElementById('closeModalEditSorteio').click();
        this.loadSorteios();
      this.uploadService.upload(this.arquivo, this.fileName, 'sorteios').toPromise()
      .then(() => {
        this.fileName = '';
        this.arquivo = '';
        console.log('Upload Realizado com Sucesso!')
      });
    })
    .catch(error => {
      console.log(error)
      this.alertService.showError('Erro ao atualizar o sorteio! verifique os campos preenchidos.', 'Error')
    })
}

salvar() {
  this.sorteio.texto = btoa(this.htmlContent)
  this.sorteio.imagem = this.fileName
  this.sorteioService.create(this.sorteio).toPromise()
    .then(() => {
      this.alertService.showSucess('Sorteio cadastrado com sucesso!', 'Sucesso')
        document.getElementById('closeModalEditSorteio').click();
        this.loadSorteios();
      this.uploadService.upload(this.arquivo, this.fileName, 'sorteios').toPromise()
      .then(() => {
        this.fileName = '';
        this.arquivo = '';
        console.log('Upload Realizado com Sucesso!')
      });
    })
    .catch(error => {
      console.log(error)
      this.alertService.showError('Erro ao cadastrar Sorteio! verifique os campos preenchidos.', 'Error')
    })
}

}
