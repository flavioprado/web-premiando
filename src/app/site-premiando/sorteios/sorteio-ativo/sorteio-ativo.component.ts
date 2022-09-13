import { Component, OnInit, Optional, SecurityContext } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/services/login.service';
import { MetadataService } from 'app/services/metadata.service';
import { NotificationService } from 'app/services/toast.service';
import { LoginRegysterComponent } from '../../login/login-regyster/login-regyster.component';
import { CotasSorteio } from '../models/cotas-sorteio';
import { FullSorteio } from '../models/full-sorteio';
import { CotasSorteioService } from '../services/sorteio-ativo.service';
import { ConfirmarReservaComponent } from './confirmar-reserva/confirmar-reserva.component';
import { MeusNumerosComponent } from './meus-numeros/meus-numeros.component';

@Component({
  selector: 'app-sorteio-ativo',
  templateUrl: './sorteio-ativo.component.html',
  styleUrls: ['./sorteio-ativo.component.css']
})
export class SorteioAtivoComponent implements OnInit {

  cotasLivres: CotasSorteio[] = [];
  cotasReservadas: CotasSorteio[] = [];
  cotasPagas: CotasSorteio[] = [];
  cotasFiltered: CotasSorteio[] = [];
  cotasHaComprar: CotasSorteio[] = [];
  contaHaPagar: string = 'teste';
  sorteio: FullSorteio;
  loading = false;

  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute,
    private sorteioAtivoService: CotasSorteioService, private loginService: AuthenticationService,
    private alertService: NotificationService, @Optional() private metadataService: MetadataService, private titleService: Title) { }

  ngOnInit(): void {
    this.scrollTop();

    let id = +this.route.snapshot.paramMap.get('id');

    this.sorteioAtivoService.currentIdSorteioAtivo = +id;
    this.sorteioAtivoService.getSorteioById(+id).subscribe(
      sorteio => {
        this.sorteio = sorteio;

        this.sorteio.texto = atob(this.sorteio.texto);
        // Build and change the og:image meta
       const baseUrl = window.location.protocol + '//' + window.location.hostname;
       const imageUrl = baseUrl + '/uploads/' + this.sorteio.imagem;

       if (this.metadataService) {
        this.metadataService.updateMetadata({
          title:this.sorteio.titulo,
          description: this.sorteio.descricao,
          image: imageUrl
        });
      }
       this.titleService.setTitle(this.sorteio.titulo);
      });

      this.loadCotasLivres();
      this.loadCotasReservadas();
      this.loadCotasPagas();
  }

  loadCotasLivres(){
    this.sorteioAtivoService.listCotasSorteio(1).subscribe(
      cotasResult => {
        if (cotasResult) {
          cotasResult.map(
            cota => {
              cota.cotaClass = 'card-cota-livre';
            }
          )
          this.cotasLivres = cotasResult;
          this.cotasFiltered = cotasResult;
        }
      }
    );
  }

  loadCotasReservadas(){
    this.sorteioAtivoService.listCotasSorteio(2).subscribe(
      cotasResult => {
        if (cotasResult) {
          this.cotasReservadas = cotasResult;
        }
      }
    );
  }

  loadCotasPagas(){
    this.sorteioAtivoService.listCotasSorteio(3).subscribe(
      cotasResult => {
        if (cotasResult) {
          this.cotasPagas = cotasResult;
        }
      }
    );
  }

  openLoginDialogLogin() {
    const dialogRef = this.dialog.open(LoginRegysterComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['sorteioAtivo/' + this.sorteio.titulo + '/' + this.sorteio.id]);
    });
  }

  openMeusNumerosDialog() {
    if (this.loginService.currentUserValue.isLogged) {
      const dialogRef = this.dialog.open(MeusNumerosComponent, {
        data: { idSorteio: this.sorteio.id },
      });

    } else {
      this.openLoginDialogLogin();
    }
  }

  confirmarReserva() {
      let idCotas: number[] = [];
      this.cotasHaComprar.forEach(element => {
        idCotas.push(element.idCota);
      });

      const dialogRef = this.dialog.open(ConfirmarReservaComponent, {
        data: { idCotas: idCotas, sorteio: this.sorteio, idCliente: this.loginService.currentUserValue.cliente ? this.loginService.currentUserValue.cliente.id : 0, cotas: this.cotasHaComprar },
        width: '640px',
        height: '550px',
        panelClass: 'full-width-dialog'
      });
      this.loading = true;
      //document.getElementById('bt_finalizar_reserva').style.display = 'none';
      dialogRef.afterClosed().subscribe(result => {
        if (result && result !== null) {
          this.router.navigate(['checkout', { cp: result , st: this.sorteio.id}]);
        } else {
          this.loading = false;
          //document.getElementById('bt_finalizar_reserva').style.display = 'initial';
        }
      });
  }

  changeColor(tipo: number) {
    if (tipo === 1) {
      this.cotasLivres.map(
        cota => {
          cota.cotaClass = 'card-cota-livre';
        }
      )
      this.filterCotaByStatus(1);
    }
    if (tipo === 2) {
      this.cotasReservadas.map(
        cota => {
          cota.cotaClass = 'card-cota-reservada';
        }
      )
      this.filterCotaByStatus(2);
    }
    if (tipo === 3) {
      this.cotasPagas.map(
        cota => {
          cota.cotaClass = 'card-cota-paga';
        }
      )
      this.filterCotaByStatus(3);
    }
  }

  filterCotaByStatus(status: number) {
    if (status === 1) {
      this.cotasFiltered = this.cotasLivres;
    }

    if (status === 2) {
      this.cotasFiltered = this.cotasReservadas;
    }

    if (status === 3) {
      this.cotasFiltered = this.cotasPagas;
    }
  }

  selectCota(cotahACompras: CotasSorteio) {

    if(!cotahACompras.selected){
      if (this.cotasHaComprar.length === 0 && cotahACompras.status === 1) {
        document.getElementById('popfinalizar').style.display = 'inline-table';
        document.getElementById('popfinalizar').style.opacity = '1';
        document.getElementById('faleConosco').style.display = 'none';
      }
  
      const index = this.cotasHaComprar.indexOf(cotahACompras);
      if (index === -1 && cotahACompras.status === 1) {
        cotahACompras.cotaClass = '';
        this.cotasHaComprar.push(cotahACompras);
        this.atualizarTextoValorHaPagar();
      }
      cotahACompras.selected = true;
    } else {
      this.unSelectCota(cotahACompras);
    }
    
  }

  unSelectCota(cotahACompras: CotasSorteio) {
    const index = this.cotasHaComprar.indexOf(cotahACompras);
    if (index > -1) {
      cotahACompras.cotaClass = 'card-cota-livre';
      this.cotasHaComprar.splice(index, 1);
    }

    if (this.cotasHaComprar.length === 0) {
      this.closeSelectedCota();
    }

    this.atualizarTextoValorHaPagar();
    cotahACompras.selected = false;

  }

  closeSelectedCota() {
    document.getElementById('popfinalizar').style.display = 'none';
    document.getElementById('popfinalizar').style.opacity = '0';
    document.getElementById('faleConosco').style.display = 'block';
  }

  atualizarTextoValorHaPagar() {
    if (this.contaHaPagar.length > 0) {
      this.contaHaPagar = this.cotasHaComprar.length + ' x' + this.sorteio.valor + ',00' + ' = ' + 'R$' + this.cotasHaComprar.length * this.sorteio.valor + ',00';
    }
  }

  showToolTip(cota: string, pagador: string){
    this.alertService.showInfo('Número ' + cota + ' reservado por ' + pagador,'')
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
