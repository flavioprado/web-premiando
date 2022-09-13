import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/services/login.service';
import { NotificationService } from 'app/services/toast.service';
import { MinhasCompras } from 'app/site-premiando/minhas-compras/view-minhas-compras/models/minhas-compras';
import { MinhasComprasService } from 'app/site-premiando/minhas-compras/view-minhas-compras/services/minhas-compras.service';

@Component({
  selector: 'app-meus-numeros',
  templateUrl: './meus-numeros.component.html',
  styleUrls: ['./meus-numeros.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class MeusNumerosComponent implements OnInit {

  listMinhasCompras: MinhasCompras[];

  constructor(public dialogRef: MatDialogRef<MeusNumerosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private alertService: NotificationService,
    private loginService: AuthenticationService,private minhasComprasService: MinhasComprasService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let currentUser = this.loginService.currentUserValue;
    if(currentUser.isLogged){
      let idSorteio = this.data['idSorteio']
      if(idSorteio){
        this.minhasComprasService.listMeusNumeros(+currentUser.cliente.id, +idSorteio).subscribe(
          compras => this.listMinhasCompras = compras.filter(compra => !compra.status.toLowerCase().includes('cancelado'))
        )
      } else {
        this.alertService.showError('Erro ao recuperar seu números!', 'ERRO')
      }
    }
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

  onNoClick(data: any): void {
    this.dialogRef.close(data);
  }

}
