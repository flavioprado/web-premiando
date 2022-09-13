import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContaBancaria } from 'app/models/conta-bancaria';
import { ContaBancariaService } from 'app/services/conta-bancaria.service';
import { AuthenticationService } from 'app/services/login.service';
import { MinhasCompras } from '../minhas-compras/view-minhas-compras/models/minhas-compras';
import { MinhasComprasService } from '../minhas-compras/view-minhas-compras/services/minhas-compras.service';
import { Payer } from './models/payer';
import { PayerIdentification } from './models/payer-indentification';
import { RegysterPixPayment } from './models/regyster-pix-payment';
import { PixService } from './services/pix.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  listSorteios = ['','','',''];
  contaBancariaList: ContaBancaria[];
  minhaCompra = new MinhasCompras();

  qrCode: string;
  qrCodeBase64: string;

  constructor(private router: Router, private route: ActivatedRoute,private contaBancariaService: ContaBancariaService,
    private minhasComprasService: MinhasComprasService, private authenticatioService: AuthenticationService, private pixService: PixService) { }

  async ngOnInit() {
    let compra = this.route.snapshot.paramMap.get('compra');
    if(compra){
      this.minhaCompra = JSON.parse(compra);
    }else {
      let idCompra = this.route.snapshot.paramMap.get('cp');
      await this.minhasComprasService.listMinhaCompra(+idCompra).subscribe(
        async result => {
          this.minhaCompra = result;
        }
      )
    }
    this.scrollTop();
    this.loadContaBancaria();
  }

  gerarQrCode(){
    let currentUser = this.authenticatioService.currentUserValue;

    let idCompra = this.route.snapshot.paramMap.get('cp');

    if(!idCompra){
      idCompra = this.minhaCompra.idCompra;
    }
    
    let payment: RegysterPixPayment = new RegysterPixPayment();
    payment.transactionAmount = this.minhaCompra.total;
    payment.idCompra = idCompra;
    payment.description = "premiando.com";
    
    let payer: Payer = new Payer();
    payer.firstName = currentUser.cliente.nome;
    payer.lastName = "";
    payer.email = currentUser.cliente.usuario.email;
    payer.identification = new PayerIdentification();

    let payerIndentification = new PayerIdentification();
    payerIndentification.number = "number";
    payerIndentification.type = "type";

    payer.identification = payerIndentification;

    payment.payer = new Payer();
    payment.payer = payer;

    this.pixService.regysterPayment(payment).subscribe(
      result => {
        this.qrCode = result.qrCode;
        this.qrCodeBase64 = result.qrCodeBase64;
        document.getElementById('gerarQrCode').style.display = 'none'
        //document.getElementById('gerarQrCodeCard').style.height = '210px'
      }
    );
  }

  copyTextHash(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);

    document.getElementById('copied').style.display = 'block'
  }

  private loadContaBancaria() {
    this.contaBancariaService.list()
      .subscribe(
        (contaBancaria) => {
          this.contaBancariaList = contaBancaria['content'];
        }
      );
  }

  getStatusColor(status: string){

    if(status === 'Não Iniciado' || status === 'Pagamento Pendente'){
      return "text-checkout-status-pendente"
    }
    if(status === 'Aprovado'){
      return "text-checkout-status-pago"
    }
    if(status === 'Cancelado'){
      return "text-checkout-status-cancelado"
    }

    return "text-checkout-status"
  }

  scrollTop(){
    let scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 100); // how far to scroll on each step
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
  }

}
