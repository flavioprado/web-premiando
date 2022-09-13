import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Clientes } from 'app/models/clientes';
import { FullSorteio } from 'app/models/full-sorteio';
import { Usuario } from 'app/models/usuario';
import { ClientesService } from 'app/services/clientes.service';
import { AuthenticationService } from 'app/services/login.service';
import { NotificationService } from 'app/services/toast.service';
import { Login } from 'app/site-premiando/login/models/login';
import { CotasSorteio } from '../../models/cotas-sorteio';
import { CotasSorteioService } from '../../services/sorteio-ativo.service';

@Component({
  selector: 'app-confirmar-reserva',
  templateUrl: './confirmar-reserva.component.html',
  styleUrls: ['./confirmar-reserva.component.css']
})
export class ConfirmarReservaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmarReservaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private sorteioAtivoService: CotasSorteioService,
    private alertService: NotificationService, private clientesService: ClientesService,
    private authenticationService: AuthenticationService,) { }

  lastClick = 0;
  id = 0;
  sorteio: FullSorteio;
  cotasHaComprar: CotasSorteio[] = [];
  @Input() public cliente: Clientes;
  @Input() public loginCliente: Login;
  private isUserExists: boolean;
  private isPermiteCadastrar: boolean;
  isBloquearClick: boolean = true;


  ngOnInit(): void {
    this.id = this.data['idCliente'];
    this.sorteio = this.data['sorteio']
    this.loginCliente = new Login();
    this.loginCliente.email = "";
    this.loginCliente.senha = "";
    this.cliente = new Clientes();
    this.cliente.usuario = new Usuario();
    this.cotasHaComprar = this.data['cotas'];
   }

  async confirmarReserva(event: any) {
    this.isBloquearClick = false;
    const currentTime = new Date().getTime();
    const ultimoClick = currentTime - this.lastClick;

    if (ultimoClick < 3000) {//voce pode adaptar de acordo com o que vc considera um click duplo
      event.stopPropagation();
    } else {
      this.id = await this.authenticationService.currentUserValue.cliente ? +this.authenticationService.currentUserValue.cliente.id : 0; 
      if(this.id > 0){
        this.sorteioAtivoService.reservarCota(this.sorteio.id, this.id, this.data.idCotas).toPromise()
        .then((result) => {
          if(result){
            this.alertService.showSucess('Cota Rservada com sucesso!', 'Sucesso');
            this.onNoClick(result);
          } else {
            this.id = 0;
            this.isBloquearClick = true;
          }
        })
        .catch(() => {
          this.isBloquearClick = true;
          //this.id = 0;
        })
      }
    }

    this.lastClick = currentTime;
  }

  saveOrUpdate() {
    this.cliente.usuario.login = this.cliente.cpf;
    this.cliente.whatsapp = this.cliente.celular;
    this.salvar();
  }

  salvar() {
    this.clientesService.createClientes(this.cliente).toPromise()
    .then(result => {
      if(result){
        this.alertService.showSucess('Cliente cadastrado com sucesso!', 'Sucesso');
        this.loginCliente = new Login();
        this.loginCliente.email = this.cliente.usuario.email;
        this.loginCliente.senha = this.cliente.usuario.senha;
        this.cliente = new Clientes();
        this.login();
      } else {
        this.alertService.showError('verifique os campos preenchidos.', 'Erro ao cadastrar')
      }
      
    })
    .catch(error => {
      this.alertService.showError('Erro ao cadastrar o cliente! verifique os campos preenchidos.', 'Error');
      this.alertService.showError('Erro: ' + error, 'Error')
    })
  }

  login() {
    this.authenticationService.authenticate(this.loginCliente).subscribe(
      (result) => {
        if (result) {
          this.confirmarReserva(null);
        }
      },
      (error) => {
        this.alertService.showError('Usuário e senha inválidos!', '')
      }
    )
  }

  isLoginExists() {
    if(!this.loginCliente.email.includes('@')){
      let re = /\./gi;
      let result = this.loginCliente.email.replace(re, '');
      this.loginCliente.email = result.replace('-','');
    }
    this.authenticationService.isLoginExists(this.loginCliente.email).subscribe(
      result => {
        this.isUserExists = result;
        this.isPermiteCadastrar = false;
        if (!result) {
          this.isPermiteCadastrar = true;
          if(this.loginCliente.email.includes('@')){
            this.cliente.usuario.email = this.loginCliente.email;
          } else {
            this.cliente.cpf = this.loginCliente.email;
          }
          this.alertService.showError('Nenhum usuário existente!', '')
        }
      }
    )
  }

  isExistentLogin() {
    return this.isUserExists;
  }

  isSaveNewUser() {
    return this.isPermiteCadastrar && !this.isUserExists;
  }

  onNoClick(data: any): void {
    this.dialogRef.close(data);
  }

}
