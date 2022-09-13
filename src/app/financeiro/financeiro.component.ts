import { Component, OnInit } from '@angular/core';
import { AddContaBancaria } from 'app/models/add-conta-bancaria';
import { ContaBancaria } from 'app/models/conta-bancaria';
import { ContaBancariaService } from 'app/services/conta-bancaria.service';
import { NotificationService } from 'app/services/toast.service';
import { TransacaoService } from '../services/transacao.service';

@Component({
  selector: 'financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.css']
})
export class FinanceiroComponent implements OnInit {

  contaBancariaList: ContaBancaria[];
  contaBancaria: ContaBancaria;

  key: string = 'id'; // Define um valor padrão, para quando inicializar o componente
  reverse: boolean = true;
  public paginaAtual = 1;

  constructor(private contaBancariaService: ContaBancariaService, private alertService: NotificationService, private financeiroService: TransacaoService) { }

  ngOnInit(): void {
    this.loadContaBancaria();
  }

  private loadContaBancaria() {
    this.contaBancariaService.list()
      .subscribe(
        (contaBancaria) => {
          this.contaBancariaList = contaBancaria['content'];
        },
        err => console.log(err)
      );
  }

  ativarDesativar(contaBancaria: AddContaBancaria) {
    if(contaBancaria.tipoConta === 'Gateway de Pagamento'){
      contaBancaria.tipoConta = '2'
    } else {
      contaBancaria.tipoConta = '1'
    }
    
    contaBancaria.ocultarConta = !contaBancaria.ocultarConta;
    this.contaBancariaService.updateContaBancaria(contaBancaria).toPromise()
      .then(() => this.loadContaBancaria()
      )
      .catch(
        error => console.log('error')
      )
  }

  loadConta(conta: ContaBancaria){
    this.contaBancaria = conta;
  }

  deletar(contaBancaria: ContaBancaria) {
    this.contaBancariaService.deleteContaBancaria(contaBancaria.id).toPromise()
      .then(() => {
        this.alertService.showSucess('Deletado com sucesso!', 'SUCESSO');
        this.loadContaBancaria();
      }

      )
      .catch(
        error => this.alertService.showError('Erro ao deletar!', 'ERRO')
      )
  }

}
