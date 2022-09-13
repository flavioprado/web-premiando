import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/services/login.service';
import { MinhasCompras } from './models/minhas-compras';
import { MinhasComprasService } from './services/minhas-compras.service';

@Component({
  selector: 'app-view-minhas-compras',
  templateUrl: './view-minhas-compras.component.html',
  styleUrls: ['./view-minhas-compras.component.css']
})
export class ViewMinhasComprasComponent implements OnInit {

  constructor(private minhasComprasService: MinhasComprasService, private _sanitizer: DomSanitizer,
    private loginService: AuthenticationService,private router: Router, private route: ActivatedRoute,) { }

  listMinhasCompras: MinhasCompras[];

  ngOnInit(): void {
    this.scrollTop();
    let currentUser = this.loginService.currentUserValue;
    if(currentUser.isLogged){
      this.minhasComprasService.minhasCompras.subscribe(
        compras => this.listMinhasCompras = compras)
    }
  }

  detalhar(compra: MinhasCompras){
    this.router.navigate(['checkout', {compra: JSON.stringify(compra)}]);
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
