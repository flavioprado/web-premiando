import { Component, OnInit } from '@angular/core';
import { Ganhadores } from 'app/models/ganhadores';
import { GanhadoresCadastro } from 'app/models/ganhadores-cadastro';
import { Sorteio } from 'app/models/sorteio';
import { GanhadoresService } from 'app/services/ganhadores.service';
import { SorteioService } from 'app/services/sorteio.service';
import { NotificationService } from 'app/services/toast.service';
import { UploadService } from 'app/services/upload.service';

@Component({
  selector: 'ganhadores',
  templateUrl: './ganhadores.component.html',
  styleUrls: ['./ganhadores.component.css']
})
export class GanhadoresComponent implements OnInit {

  listGanhadores: Ganhadores[];
  ganhador: GanhadoresCadastro;
  sorteioList: Sorteio[];
  public paginaAtual = 1;
  fileName = '';
  arquivo: string;

  constructor(private alertService: NotificationService, private ganhadorService: GanhadoresService,
    private uploadService: UploadService, private sorteioService: SorteioService) { }

  ngOnInit(): void {
    this.ganhador = new GanhadoresCadastro();
    this.loadGanhadores();
    this.loadSorteios();
    
  }

  loadSorteios(){
    this.sorteioService.list().subscribe(
      sorteios => {
        this.sorteioList = sorteios['content']
        this.sorteioList = this.sorteioList.filter(sorteio => !sorteio.rifinha)
      }
    );
  }

  loadGanhadores(){
    this.ganhadorService.list().subscribe(
      ganhadores => this.listGanhadores = ganhadores['content']
    );
  }

  setSorteio(sorteio: Sorteio){
    this.ganhador.idSorteio = sorteio.id
    this.ganhador.titulo = sorteio.titulo
  }

  loadEditGanhador(id: number){
    if(id){
      this.ganhadorService.findGanhadoreById(id).subscribe(
        ganhador => this.ganhador = ganhador
      )
    } else {
      this.ganhador = new GanhadoresCadastro();
    }
  }

  saveOrUpdate() {
    this.ganhador.imagem = this.fileName;
    if (this.ganhador.id && this.ganhador.id > 0) {
      this.atualizar();
    } else {
      this.ganhadorService.createGanhadores(this.ganhador).toPromise()
        .then(() => {
          this.alertService.showSucess('Cadastrado com sucesso!', 'SUCESSO')
          document.getElementById('closeModalGanhador').click();
          this.uploadService.upload(this.arquivo, this.fileName, 'sorteios').toPromise()
          .then(() => {
            this.fileName = '';
            this.arquivo = '';
            console.log('Upload Realizado com Sucesso!')
          });
          this.loadGanhadores();
        }
        )
        .catch(
          error => this.alertService.showError('Erro ao cadastrar!', 'ERRO')
        )
    }
  }

  atualizar() {
    this.ganhadorService.updateGanhadores(this.ganhador, this.ganhador.id).toPromise()
      .then(() => {
          this.alertService.showSucess('Atualizado com sucesso!', 'SUCESSO')
          document.getElementById('closeModalGanhador').click();
          if(this.arquivo){
            this.uploadService.upload(this.arquivo, this.fileName, 'sorteios').toPromise()
          .then(() => {
            this.fileName = '';
            this.arquivo = '';
            console.log('Upload Realizado com Sucesso!')
          });
          }
          this.loadGanhadores();
        }
      )
      .catch(
        error => this.alertService.showError('Erro ao atualizar!', 'ERRO')
      )
  }

  deletar(ganhador: Ganhadores) {
    this.ganhadorService.deleteGanhadores(ganhador.id).toPromise()
      .then(() => {
        this.alertService.showSucess('Deletado com sucesso!', 'SUCESSO');
        this.ngOnInit();
      })
      .catch(
        error => this.alertService.showError('Erro ao deletar!', 'ERRO')
      )
  }

  async fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        this.fileName = file.name;
        this.arquivo = event.target.files[0];
    }
}

}
