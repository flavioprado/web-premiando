import { Component, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Clientes } from 'app/models/clientes';
import { Usuario } from 'app/models/usuario';
import { ClientesService } from 'app/services/clientes.service';
import { AuthenticationService } from 'app/services/login.service';
import { NotificationService } from 'app/services/toast.service';
import { Login } from '../models/login';

@Component({
  selector: 'app-login-regyster',
  templateUrl: './login-regyster.component.html',
  styleUrls: ['./login-regyster.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginRegysterComponent implements OnInit {

  @Input() public cliente: Clientes;
  @Input() public loginCliente: Login;
  private isUserExists: boolean;
  private isPermiteCadastrar: boolean;
  @Input() public isTelaCheckout: boolean = false;

  constructor(public dialogRef: MatDialogRef<LoginRegysterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Clientes,
    private clientesService: ClientesService,
    private authenticationService: AuthenticationService,
    private alertService: NotificationService) { }

  ngOnInit(): void {
    this.loginCliente = new Login();
    this.cliente = new Clientes();
    this.cliente.usuario = new Usuario();
    this.authenticationService.logout();
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
          if(this.isTelaCheckout){
            document.getElementById('bt-finalizar-checkout').click();
          }
        } else {
          this.alertService.showError('verifique os campos preenchidos.', 'Erro ao cadastrar')
        }
        
      })
      .catch(error => {
        this.alertService.showError('Erro ao cadastrar o cliente! verifique os campos preenchidos.', 'Error')
      })
  }

  login() {
    this.authenticationService.authenticate(this.loginCliente).subscribe(
      (result) => {
        if (result) {
          this.dialogRef.close();
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

}
