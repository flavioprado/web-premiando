import { Component, OnInit } from '@angular/core';
import { RelatorioFinanceiro } from 'app/models/relatorio-financeiro';
import { NotificationService } from 'app/services/toast.service';
import { TransacaoService } from 'app/services/transacao.service';

export class SorteiosRelatorioFinanceiro {
  idSorteio: number;
  titulo: string;
  idSorteioPrincipal: number;
  totalAprovado: number;
  totalPendente: number;
  totalCancelado: number;
  totalCompras: number;
}

export class ContasRelatorioFinanceiro {
  idConta: number;
  nomeConta: string;
  totalAprovado: number;
  totalPendente: number;
  totalCancelado: number;
  totalCompras: number;
}

@Component({
  selector: 'app-relatorio-financeiro',
  templateUrl: './relatorio-financeiro.component.html',
  styleUrls: ['./relatorio-financeiro.component.css']
})
export class RelatorioFinanceiroComponent implements OnInit {

  listContas: ContasRelatorioFinanceiro[] = [];
  listIdContas: number[] = [];
  
  listSorteios: SorteiosRelatorioFinanceiro[] = [];
  sorteio: SorteiosRelatorioFinanceiro;
  listIdSorteios: number[] = [];

  listSorteiosRifinha: SorteiosRelatorioFinanceiro[] = [];
  listIdSorteiosRifinha: number[] = [];

  relatorioFinanceiro: RelatorioFinanceiro[];
  totalLiquido: number = 0;
  totalPendentes: number = 0;
  totalCancelados: number = 0;
  totalCompras: number = 0;

  constructor(private alertService: NotificationService, private financeiroService: TransacaoService) { }

  ngOnInit() {
    this.loadRelatorioFinanceiroBySorteio(null);
  }

  loadRelatorioFinanceiroBySorteio(idSorteio: number){
    this.totalCancelados = 0;
    this.totalLiquido = 0;
    this.totalPendentes = 0;
    this.totalCompras = 0;
    this.listIdContas =  [];
    this.listContas = [];
    this.listIdSorteiosRifinha = [];
    this.listSorteiosRifinha = [];

    this.financeiroService.getRelatorioFinanceiro()
    .subscribe(result => {
      this.relatorioFinanceiro = idSorteio ? result.filter(r => (r.idSorteio === idSorteio || r.idSorteioPrincipal === idSorteio)) : result;
      this.relatorioFinanceiro.forEach(
        element => {

           //LOAD CONTAS
           let conta: ContasRelatorioFinanceiro = new ContasRelatorioFinanceiro();
           conta.idConta = element.idConta;
           conta.nomeConta = element.nomeConta;
           conta.totalAprovado = 0;
           conta.totalPendente = 0;
           conta.totalCancelado = 0;
           conta.totalCompras = 0;
 
           if(!this.listIdContas.includes(element.idConta)){
             this.listIdContas.push(element.idConta)
             this.listContas.push(conta);
           }
           //FIM LOAD CONTAS

           if(this.listIdContas.includes(element.idConta)){

            if(element.statusCompra === 2){ //APROVADO
              this.listContas.filter(c => c.idConta === element.idConta ? c.totalAprovado += +element.totalVendas :  c.totalAprovado = c.totalAprovado)
            } else if(element.statusCompra === 1 || element.statusCompra === 99) { //PENDENTE
              this.listContas.filter(c => c.idConta === element.idConta ? c.totalPendente += +element.totalVendas :  c.totalPendente = c.totalPendente);
            } else if(element.statusCompra === 3) { //CANCELADO
              this.listContas.filter(c => c.idConta === element.idConta ? c.totalCancelado += +element.totalVendas :  c.totalCancelado = c.totalCancelado);
            }
  
            this.listContas.filter(c => c.idConta === element.idConta ? c.totalCompras += +element.totalCompras :  c.totalCompras = c.totalCompras);
           }

          if(element.statusCompra === 2){ //APROVADO
            this.totalLiquido += +element.totalVendas;
          } else if(element.statusCompra === 1 || element.statusCompra === 99) { //PENDENTE
            this.totalPendentes += +element.totalVendas;
          } else if(element.statusCompra === 3) { //CANCELADO
            this.totalCancelados += +element.totalVendas;
          }

          this.totalCompras += +element.totalCompras;


          //LOAD SORTEIOS
          //if(!idSorteio){
            let sorteio: SorteiosRelatorioFinanceiro = new SorteiosRelatorioFinanceiro();
            sorteio.idSorteio = element.idSorteio;
            sorteio.titulo = element.titulo;

            if(!this.listIdSorteios.includes(element.idSorteio) && !element.rifinha){
              this.listIdSorteios.push(element.idSorteio)
              this.listSorteios.push(sorteio);
            }

            if(!this.listIdSorteiosRifinha.includes(element.idSorteio) && element.rifinha){
              sorteio.idSorteioPrincipal = element.idSorteioPrincipal;
              sorteio.totalAprovado = 0;
              sorteio.totalPendente = 0;
              sorteio.totalCancelado = 0;
              sorteio.totalCompras = 0;
              this.listIdSorteiosRifinha.push(element.idSorteio)
              this.listSorteiosRifinha.push(sorteio);
            }

            if(this.listIdSorteiosRifinha.includes(element.idSorteio) && element.rifinha){
              if(element.statusCompra === 2){ //APROVADO
                this.listSorteiosRifinha.filter(c => c.idSorteio === element.idSorteio ? c.totalAprovado += +element.totalVendas :  c.totalAprovado = c.totalAprovado)
              } else if(element.statusCompra === 1 || element.statusCompra === 99) { //PENDENTE
                this.listSorteiosRifinha.filter(c => c.idSorteio === element.idSorteio ? c.totalPendente += +element.totalVendas :  c.totalPendente = c.totalPendente);
              } else if(element.statusCompra === 3) { //CANCELADO
                this.listSorteiosRifinha.filter(c => c.idSorteio === element.idSorteio ? c.totalCancelado += +element.totalVendas :  c.totalCancelado = c.totalCancelado);
              }
    
              this.listSorteiosRifinha.filter(c => c.idSorteio === element.idSorteio ? c.totalCompras += +element.totalCompras :  c.totalCompras = c.totalCompras);
             }
          //}
          //FIM LOAD SORTEIOS
        }
      )
    })
  }

  setSorteio(sorteio: SorteiosRelatorioFinanceiro){
    this.sorteio = sorteio;
    this.loadRelatorioFinanceiroBySorteio(sorteio ? sorteio.idSorteio: null);
    if(sorteio){
      this.listSorteiosRifinha = this.listSorteiosRifinha.filter(s => s.idSorteioPrincipal === sorteio.idSorteio);
    }
  }

}
