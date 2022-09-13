import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsUrl } from 'app/constants/urls';
import { Clientes } from 'app/models/clientes';
import { Endereco } from 'app/models/endereco';
import { Login } from 'app/models/login';
import { ModeloMensagem } from 'app/models/modelo-mensagem';
import { Usuario } from 'app/models/usuario';
import { ClientesService } from 'app/services/clientes.service';
import { AuthenticationService } from 'app/services/login.service';
import { ModeloMensagemService } from 'app/services/modelo-mensagem.service';
import { NotificationService } from 'app/services/toast.service';

@Component({
  selector: 'clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  listModeloMensagem: ModeloMensagem[];
  listClientes: Clientes[]
  cliente: Clientes;
  nameFilter: string;
  dataToExport: Date;

  key: string = 'id'; // Define um valor padrão, para quando inicializar o componente
  reverse: boolean = true;
  public paginaAtual = 1;

  constructor(private clientesService: ClientesService,
    private alertService: NotificationService, private router: Router,
    private modeloMensagemService: ModeloMensagemService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.cliente = new Clientes();
    this.cliente.endereco = new Endereco();
    this.cliente.usuario = new Usuario();
    this.loadClientes();

    this.modeloMensagemService.list().subscribe(
      modelosMensagem => this.listModeloMensagem = modelosMensagem.filter(msg => msg.ativo)
    );
  }

  loadCliente(cliente: Clientes){
    this.cliente = cliente;
    if(!cliente.endereco){
      this.cliente.endereco = new Endereco();
    }
  }

  atualizarListaEFiltrar() {
    this.loadClientes().then(lista => this.searchClient(this.nameFilter, lista));
  }

  searchClient(name: string, listaClientes: Clientes[]){
    let filteredList: Clientes[] = listaClientes;

    if (name != undefined && name != null && name != '') {
      filteredList = filteredList.filter(cliente => cliente.nome.toLowerCase().replace(/\s/g, "").lastIndexOf(name.toLowerCase().replace(/\s/g, ""), 0) === 0);
    }

    this.listClientes = filteredList;
  }

  clearFilterSearchName() {
    this.nameFilter = '';
  }

  atualizar() {
    this.clientesService.updateClientes(this.cliente).toPromise()
    .then(() => {
      this.alertService.showSucess('Cliente atualizado com sucesso!', 'Sucesso');
      document.getElementById('closeModalEditUser').click();
      this.loadClientes();
    })
    .catch(error => {
      console.log(error.error.erros);
      this.alertService.showError('Erro ao atualizar o cliente! verifique os campos preenchidos.', 'Error')
    })
  }

  openChatWhatsApp(cliente: Clientes, mensagem: string) {
    let msg = this.getMensagem(cliente, mensagem, );
    window.open(ConstantsUrl.urlZap + '55' + cliente.celular + '&text=' + msg, "_blank");
  }

  getMensagem(cliente: Clientes, mensagem: string){
    let msg = mensagem.replace(' ', '%20');
    msg = msg.replace('%CLIENTE_NOME%', cliente.nome);
    msg = msg.replace('%CLIENTE_NOME_COMPLETO%', cliente.nome);

    return msg;
  }

  private loadClientes(): Promise<Clientes[]>{
    return this.clientesService.list().toPromise()
      .then(
        (clientes) => {
          this.listClientes = clientes['content'];
          return clientes['content'];
        },
        err => console.log(err)
      );
  }

  async logarComo(clientes: Clientes){
    await this.authenticationService.logarComo(clientes.usuario.login).subscribe(
      async result => {
        if(result){
          let user: Login = new Login();
          user.email = clientes.usuario.login;
          user.senha = result['senha'];
          await this.authenticationService.authenticate(user).subscribe(
            (result) => {
              if (result) {
                this.router.navigate([]).then(result => {  window.open('#/principal/', '_blank'); });
              }
            }
          )
        }
        if (!result) {
          this.alertService.showError('Nenhum usuário existente!', '')
        }
      }
    )
  }

  exportContact(){
    let stringFormatada: string[] = this.dataToExport.toString().split('-')
    let dataFormatada = stringFormatada[2] + '/' + stringFormatada[1] + '/' + stringFormatada[0]
    this.clientesService.exportContact(dataFormatada.toString())
    .subscribe(
      result => this.downloadFile(result, dataFormatada),
      (err) => {this.alertService.showWarning('Listagem Vazia', 'Não há contatos para essa data.')
      }
    )
  }

  downloadFile(data: any, dataContato: string) {
    const blob = new Blob([data], { type: 'text/csv'});
    const url = window.URL.createObjectURL(data);
    var a = document.createElement("a");
    a.href = url;
    a.target = '_blank';
    a.download    = 'contacts_' + dataContato + '.csv';
    document.body.appendChild(a);
    a.click();
  }

}
