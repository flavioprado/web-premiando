import { CurrencyPipe, DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsUrl } from 'app/constants/urls';
import { ModeloMensagem } from 'app/models/modelo-mensagem';
import { ContaService } from 'app/services/conta.service';
import { ModeloMensagemService } from 'app/services/modelo-mensagem.service';
import { SorteioService } from 'app/services/sorteio.service';
import { NotificationService } from 'app/services/toast.service';
import { Compras } from '../models/compras';
import { Conta } from '../models/conta';
import { Sorteio } from '../models/sorteio';
import { ComprasFilter } from './models/filter';
import { StatusCompra } from '../models/status-compra';
import { ComprasService } from '../services/compras.service';
import { CartDetail } from 'app/models/cart-detail';
import { PageEvent } from '@angular/material/paginator';
import { Transacao } from 'app/models/transacao';
import { TransacaoService } from 'app/services/transacao.service';
import { RegisterPaymentService } from 'app/services/register-payment.service';
import { RegisterPayment } from 'app/models/register-payment';
import { UploadService } from 'app/services/upload.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
  providers: [CurrencyPipe, DatePipe]
})
export class ComprasComponent implements OnInit {

  listCompras: Compras[];
  statusList: StatusCompra[];
  sorteioList: Sorteio[];
  contaList: Conta[];
  comprovante: string;

  value = 'Limpar';

  filter: ComprasFilter;

  pageIndex:number
  public paginaAtual = 1;
  pageEvent: PageEvent;
  // Configuração da ordenação
  key: string = 'id'; // Define um valor padrão, para quando inicializar o componente
  reverse: boolean = true;

  listModeloMensagem: ModeloMensagem[];
  cartDatail: CartDetail;

  fileName = '';
  base64String: string | ArrayBuffer = '';
  arquivo: string;

  registroPagamento: RegisterPayment;

  constructor(private comprasService: ComprasService,
    private alertService: NotificationService, private router: Router,
    private sorteioService: SorteioService, private contaService: ContaService,
    private modeloMensagemService: ModeloMensagemService, private currencyPipe: CurrencyPipe,
    private transacaoService: TransacaoService, private registerPaymentService: RegisterPaymentService,
    private compraServie: ComprasService, private uploadService: UploadService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.filter = new ComprasFilter();
    this.sorteioService.listStatus().subscribe(
      status => this.statusList = status.filter(s => s.id !== 99)
    );
    this.sorteioService.list().subscribe(
      sorteios => this.sorteioList = sorteios['content']
    );
    this.contaService.list().subscribe(
      conta => this.contaList = conta['content']
    )
    this.loadCompras();

    this.modeloMensagemService.list().subscribe(
      modelosMensagem => this.listModeloMensagem = modelosMensagem.filter(msg => msg.ativo)
    );

    if (localStorage.getItem('current_page')) {
      this.pageIndex = +localStorage.getItem('current_page')
    } else {
      this.pageIndex = 0;
    }

    this.registroPagamento = new RegisterPayment();
  }

  atualizarListaEFiltrar() {
    this.loadCompras().then(lista => this.searchFilters(this.filter.name, this.filter.status, this.filter.nomeSorteio, 
                                                       this.filter.formaPagamento, this.filter.dataPedidoInicio, this.filter.dataPedidoFim, 
                                                       this.filter.cota, lista));
  }

  searchFilters(comprador: string, status: number, sorteio: string, formaPagamento: string, dataInicio: string, dataFim: string, cota: string, listaCompras: Compras[]) {

    let filteredList: Compras[] = listaCompras;

    if (comprador != undefined && comprador != null && comprador != '') {
      filteredList = filteredList.filter(compra => (compra.comprador.toLowerCase().replace(/\s/g, "").lastIndexOf(comprador.toLowerCase().replace(/\s/g, ""), 0) === 0));
    }

    if (status != undefined && status != undefined && status != +'') {
      if (status === 4) {
        status = 1
      } else if (status === 1) {
        status = 99
      }
      filteredList = filteredList.filter(compra => compra.status === status)
    }

    if (sorteio != undefined && sorteio != null && sorteio.length > 0) {
      filteredList = filteredList.filter(compra => compra.nomeSorteio.toLowerCase() === sorteio.toLowerCase())
    }

    if (formaPagamento != undefined && formaPagamento != null && formaPagamento.length > 0) {
      filteredList = filteredList.filter(compra => compra.nomeBanco !== null && compra.nomeBanco.toLowerCase() === formaPagamento.toLowerCase())
    }

    let start = new Date(dataInicio);
    let end = new Date(dataFim);

    start.setDate(start.getDate() + 1)
    end.setDate(end.getDate() + 1)
    if (dataInicio != null &&start != undefined && start != null && start.valueOf().toString() !== 'NaN' &&
        dataFim != null && end != undefined && end != null && end.valueOf().toString() !== 'NaN') {
          
          if( new Date(start).getTime() == new Date(end).getTime()){
            filteredList = filteredList.filter(compra => formatDate(compra.dataCompra,'yyyy-MM-dd','en_US') == formatDate(start,'yyyy-MM-dd','en_US') );
          } else {
            filteredList = filteredList.filter(compra => formatDate(compra.dataCompra,'yyyy-MM-dd','en_US') >= formatDate(start,'yyyy-MM-dd','en_US') && 
                                                         formatDate(compra.dataCompra,'yyyy-MM-dd','en_US') <= formatDate(end,'yyyy-MM-dd','en_US'));
          }
    }

    if (cota != undefined && cota != null && cota.length > 0) {
      filteredList = filteredList.filter(compra => compra.rifinha ? this.getListCotasSliceRifinha(compra.cotas).includes(cota) : this.getListCotasSlice(compra.cotas).includes(cota))
    }

    this.listCompras = filteredList;
  }

  setFilterStatus(status: StatusCompra){
    this.filter.status = status.id
    this.filter.statusDescricao = status.descricao
  }

  setFilterFormaPagamento(conta: Conta){
    this.filter.formaPagamento = conta.nomeBanco
  }

  setFilterSorteio(sorteio: Sorteio){
    this.filter.nomeSorteio = sorteio.titulo
  }

  updatePage(event?) {
    localStorage.setItem('current_page', '' + event.pageIndex)
    return event;
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  openChatWhatsApp(compra: Compras, mensagem: string) {
    let msg = this.getMensagem(compra, mensagem);
    window.open(ConstantsUrl.urlZap + '55' + compra.celular + '&text=' + msg, "_blank");
  }

  openChatWhatsAppNoMsg(celular: string) {
    window.open(ConstantsUrl.urlZap + celular + '&text=' , "_blank");
  }

   getIconPayment(status: number){
    if(status === 1){
      return "material-icons text-warning background-icons"
    }
    if(status === 2){
      return "material-icons text-sucess-compras background-icons"
    }
    return "material-icons background-icons"
  }

  getClassIconRegysterPayment(status: number){
    if(status === 2){
      return "material-icons text-yellow background-icons"
    }
    return "material-icons text-sucess-compras background-icons"
  }

  getIconRegysterPayment(status: number){
    if(status === 2){
      return "info"
    }
    return "credit_score"
  }

  getClassIconExcludeOrReserver(status: number){
    if(status === 2 || status === 3){
      return "material-icons text-warning background-icons"
    }
    return "material-icons text-danger background-icons"
  }

  getIconExcludeOrReserver(status: number){
    if(status === 2 || status === 3){
      return "hourglass_full"
    }
    return "delete_outline"
  }

  getLineColorTable(status: number){

    if(status === 1){
      return "line-pedding-aproved"
    }
    if(status === 2){
      return "line-aproved"
    }
    if(status === 3){
      return "line-canceled"
    }
    if(status === 4 || status === 99){
      return "line-pedding"
    }
    return "line-pedding"
  }

  getLineColor(status: number){

    if(status === 1){
      return "line-pedding"
    }
    if(status === 2){
      return "line-aproved"
    }
    if(status === 3){
      return "line-canceled"
    }
    if(status === 4 || status === 99){
      return "line-pedding-aproved"
    }
    return "line-pedding"
  }

  getOpcaoAprovarByStatus(description: string){
    if(description === 'Aprovado' || description === 'Aprovado'.toUpperCase()){
      return false;
    }
    if(description === 'Cancelado' || description === 'Cancelado'.toUpperCase()){
      return false;
    }
    if(description === 'Aguardando Pagamento' || description === 'Não Iniciado' 
    || description === 'Pagamento Pendente' || description === 'Pendente' || description === 'Pendente'.toUpperCase()){
      return true;
    }
  }

  getMensagem(compra: Compras, mensagem: string) {
    let msg = mensagem.replace(/\s+/g, '%20');
    msg = mensagem.replace(/\n\r?/g, '%0D%0A');
    msg = msg.replace('%CLIENTE_NOME%', compra.comprador);
    msg = msg.replace('%CLIENTE_NOME_COMPLETO%', compra.comprador);
    msg = msg.replace('%COMPRA_COTAS%', compra.rifinha ? this.getCotasSliceRifinha(compra.cotas) : this.getCotasSlice(compra.cotas));
    msg = msg.replace('%COMPRA_VALOR_TOTAL%', this.currencyPipe.transform(compra.total, ''));
    msg = msg.replace('%SORTEIO_TITULO%', compra.nomeSorteio);
    msg = msg.replace('%SORTEIO_DATA%', compra.dataCompra);

    return msg;
  }

  getCotasSlice(cotas: string) {
    let list = cotas.split(',');
    let listaModificada: string[] = [];

    list.forEach(cota => {
      listaModificada.push((('000' + cota).slice(-3)))
    })

    return listaModificada.toString();

  }

  getCotasSliceRifinha(cotas: string) {
    let list = cotas.split(',');
    let listaModificada: string[] = [];

    list.forEach(cota => {
      listaModificada.push((('00' + cota).slice(-2)))
    })

    return listaModificada.toString();

  }

  getListCotasSlice(cotas: string) {
    let list = cotas.split(',');
    let listaModificada: string[] = [];

    list.forEach(cota => {
      listaModificada.push((('000' + cota).slice(-3)))
    })

    return listaModificada;

  }

  getListCotasSliceRifinha(cotas: string) {
    let list = cotas.split(',');
    let listaModificada: string[] = [];

    list.forEach(cota => {
      listaModificada.push((('00' + cota).slice(-2)))
    })

    return listaModificada;

  }

  loadCartDetail(id: number){
    this.comprasService.getCartDetail(id).subscribe(
      cartDetail => {
        this.cartDatail = cartDetail;
        this.cartDatail.id = id;
        this.cartDatail.resumoCompra.cotasCard = [];
        this.cartDatail.resumoCompra.cotasCard = cartDetail.resumoCompra.cotas.split(',')
      }
    )
  }

  getClassLabelStatus(description: string){
    if(description === 'Aprovado' || description === 'Aprovado'.toUpperCase()){
      return 'label-status-aprovado'
    }
    if(description === 'Cancelado' || description === 'Cancelado'.toUpperCase()){
      return 'label-status-cancelado'
    }
    if(description === 'Aguardando Pagamento' || description === 'Não Iniciado' 
    || description === 'Pagamento Pendente' || description === 'Pendente' || description === 'Pendente'.toUpperCase()){
      return 'label-status-pendente'
    }
  }

  clearFilterSearchName() {
    this.filter.name = '';
  }

  clearFilterSearchStatus() {
    this.filter.status = null;
    this.filter.statusDescricao = null;
  }

  clearFilterSearchSorteio() {
    this.filter.nomeSorteio = null;
  }

  clearFilterSearchFormaPagamento() {
    this.filter.formaPagamento = null;
  }

  clearFilterSearchData() {
    this.filter.dataPedidoInicio = '';
    this.filter.dataPedidoFim = '';
  }

  clearFilterSearchCota() {
    this.filter.cota = '';
  }

  openDialogComprovante(transacao: Transacao){
    this.transacaoService.getArquivo(transacao.id).subscribe(
      result => {
        this.comprovante = result['imagem'];
      }
    )
  }

  cancelarTransacao(id: number){
    this.registerPaymentService.cancelarRegisterPayment(id).subscribe(
      result => {
        this.alertService.showSucess('Transação Cancelada com sucesso!', 'Sucesso')
        this.loadCartDetail(this.cartDatail.id) 
        this.atualizarListaEFiltrar();
      }
    )
  }

  aprovarTrasacao(id: number){
    this.registerPaymentService.updateRegisterPayment(id).subscribe(
      result => {
        this.alertService.showSucess('Transação Aprovada com sucesso!', 'Sucesso')
        this.loadCartDetail(this.cartDatail.id)
        this.atualizarListaEFiltrar();
      }
    )
  }

  reservarOrDelete(compra: Compras, status: number){
    if(status === 2 || status === 3){
      this.compraServie.reservarCompra(compra.id).toPromise()
      .then(() => {
        this.alertService.showSucess('Compra reservada com sucesso!', 'Sucesso');
        this.atualizarListaEFiltrar();
      })
      .catch(error => {
        this.alertService.showError('Erro ao reservar a compra!', 'Error')
      })
    } else {
      let confirmado = confirm("Deseja Realmente Cancelar ?")
      if(confirmado){
        this.compraServie.cancelarCompra(compra.id).toPromise()
        .then(() => {
          this.alertService.showSucess('Compra cancelada com sucesso!', 'Sucesso');
          this.atualizarListaEFiltrar();
        })
        .catch(error => {
          this.alertService.showError('Erro ao cancelar a compta!', 'Error')
        })
      }
    }
  }

  setRegistroPagamentoFormaPagamento(conta: Conta){
    this.registroPagamento.nomeConta = conta.nomeBanco;
    this.registroPagamento.idConta = conta.id;
  }

  limparContaRegistroPagamento(){
    this.registroPagamento.nomeConta = null;
    this.registroPagamento.idCompra = null;
  }

  async onFileSelected(event: any) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        this.fileName = file.name.split('.')[0] + new Date().getTime() + '.' + file.name.split('.')[1];
        this.arquivo = event.target.files[0];
    }
  }

  openDialogRegisterPayment(compra: Compras){
    this.registroPagamento.valorPago = compra.total;
    this.registroPagamento.idCompra = compra.id;
    this.registroPagamento.comprovante = this.fileName;
    this.registroPagamento.dataTransacao = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    document.getElementById('btt_regyster_payment').click();
  }

  salvarRegistroPagamento() {
    this.registerPaymentService.createRegisterPayment(this.registroPagamento).toPromise()
    .then(() => {
      if(this.arquivo){
        this.uploadService.upload(this.arquivo, this.fileName, 'sorteios').toPromise()
        .then(() => {
          this.alertService.showSucess('Registro de Pagamento cadastrado com sucesso!', 'Sucesso')
          this.registroPagamento  = new RegisterPayment();
          document.getElementById('closeModalRegistroPagamento').click();
          this.atualizarListaEFiltrar();
        });
      } else {
        this.alertService.showSucess('Registro de Pagamento cadastrado com sucesso!', 'Sucesso')
        this.registroPagamento  = new RegisterPayment();
        document.getElementById('closeModalRegistroPagamento').click();
        this.atualizarListaEFiltrar();
      }
    })
    .catch(error => {
      console.log(error)
      this.alertService.showError('Erro ao cadastrar a transação! verifique os campos preenchidos.', 'Error')
    })
  }

  private async loadCompras(): Promise<Compras[]> {
    return this.comprasService.list().toPromise()
      .then(
        (compras) => {
          compras['content'].forEach(compra => {
            compra.cotasCard = [];
            compra.cotasCard = compra.cotas.split(',')
          });
          this.listCompras = compras['content'];
          return compras['content'];
        },
        err => console.log(err),
      );
  }

}
