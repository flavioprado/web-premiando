import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModeloMensagem } from 'app/models/modelo-mensagem';
import { ModeloMensagemService } from 'app/services/modelo-mensagem.service';
import { NotificationService } from 'app/services/toast.service';

@Component({
  selector: 'app-msg-whatts',
  templateUrl: './msg-whatts.component.html',
  styleUrls: ['./msg-whatts.component.css']
})
export class MsgWhattsComponent implements OnInit {

  key: string = 'id'; // Define um valor padrão, para quando inicializar o componente
  reverse: boolean = true;
  public paginaAtual = 1;

  listModeloMensagem: ModeloMensagem[];
  modeloMensagemCadastro: ModeloMensagem;

  public variaveisDisponiveis = ['%CLIENTE_NOME%', '%CLIENTE_NOME_COMPLETO%', '%COMPRA_COTAS%',
    '%COMPRA_VALOR_TOTAL%', '%SORTEIO_TITULO%', '%SORTEIO_DATA%']

  constructor(private alertService: NotificationService, private router: Router,
    private modeloMensagemService: ModeloMensagemService) { }

  ngOnInit() {
    this.modeloMensagemCadastro = new ModeloMensagem();

    this.modeloMensagemService.list().subscribe(
      modelosMensagem => this.listModeloMensagem = modelosMensagem
    );
  }

  loadMsg(modelosMensagem: ModeloMensagem){
    this.modeloMensagemCadastro = modelosMensagem;
  }

  criar(modelosMensagem: ModeloMensagem) {
    this.modeloMensagemService.createModeloMensagem(modelosMensagem).toPromise()
      .then(() => this.alertService.showSucess('Atualizado com sucesso!', 'SUCESSO')
      )
      .catch(
        error => this.alertService.showError('Erro ao atualizar!', 'ERRO')
      )
  }

  ativarDesativar(modelosMensagem: ModeloMensagem) {
    modelosMensagem.ativo = !modelosMensagem.ativo;
    this.modeloMensagemService.updateModeloMensagem(modelosMensagem).toPromise()
      .then(() => {
        this.alertService.showSucess('Alterado com sucesso!', 'SUCESSO');
        this.ngOnInit();
      }
      )
      .catch(
        error => console.log('error')
      )
  }

  deletar(modelosMensagem: ModeloMensagem) {
    this.modeloMensagemService.deleteModeloMensagem(modelosMensagem.id).toPromise()
      .then(() => {
        this.alertService.showSucess('Deletado com sucesso!', 'SUCESSO');
        this.ngOnInit();
      }

      )
      .catch(
        error => this.alertService.showError('Erro ao deletar!', 'ERRO')
      )
  }

  atualizar() {
    this.modeloMensagemService.updateModeloMensagem(this.modeloMensagemCadastro).toPromise()
      .then(() => {
          this.alertService.showSucess('Atualizado com sucesso!', 'SUCESSO')
          document.getElementById('closeModalEditMsg').click();
          this.ngOnInit();
        }
      )
      .catch(
        error => this.alertService.showError('Erro ao atualizar!', 'ERRO')
      )
  }

  saveOrUpdate() {
    if (this.modeloMensagemCadastro.id > 0) {
      this.atualizar();
    } else {
      this.modeloMensagemService.createModeloMensagem(this.modeloMensagemCadastro).toPromise()
        .then(() => {
          this.alertService.showSucess('Cadastrado com sucesso!', 'SUCESSO')
          document.getElementById('closeModalEditMsg').click();
          this.ngOnInit();
        }
        )
        .catch(
          error => this.alertService.showError('Erro ao cadastrar!', 'ERRO')
        )
    }
  }

  addIntoMsg(msg: string){
    this.modeloMensagemCadastro.mensagem = this.modeloMensagemCadastro.mensagem.concat(msg);
  }

}
