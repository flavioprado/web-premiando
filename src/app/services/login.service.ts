import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { NotificationService } from './toast.service';
import { Usuario } from 'app/models/usuario';
import { ClienteJwt } from 'app/models/cliente-jwt';
import { Login } from 'app/models/login';


const baseUrl: string = environment.baseUrlLogin;
const baseUrlLoginExists: string = environment.baseUrlLoginExists;

export class UserLogin {
  token: string;
  isLogged: boolean;
  cliente: ClienteJwt;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<UserLogin>;
  private currentUserAdminSubject: BehaviorSubject<UserLogin>;
  currentUser: Observable<UserLogin>;
  currentUserAdmin: Observable<UserLogin>;


  constructor(private router: Router, private http: HttpClient, private alertService: NotificationService) {
    this.currentUserSubject = new BehaviorSubject<UserLogin>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();

    this.currentUserAdminSubject = new BehaviorSubject<UserLogin>(
      JSON.parse(localStorage.getItem('currentUserAdmin') || '{}')
    );
    this.currentUserAdmin = this.currentUserAdminSubject.asObservable();
  }

  get currentUserValue(): UserLogin {
    return this.currentUserSubject.value;
  }

  get currentUserAdminValue(): UserLogin {
    return this.currentUserAdminSubject.value;
  }

  isLoginExists(login: string) {
    let url = `${baseUrlLoginExists}/auth/${login}/exists`;
    return this.http.get<any>(url);
  }

  validarSessao() {
    let url = `${baseUrlLoginExists}/auth/validarSessao`;
    return this.http.get<any>(url);
  }

  authenticate(authenticate: Login) : Observable<boolean> {
    let url = `${baseUrl}`;
    let subject = new Subject<boolean>();
    let isAuthenticated: boolean = false;
    this.http.post<any>(url, authenticate, { observe: 'response' })
      .subscribe(
        response => {
          let userLogin = this.getUserLogin(response);
          localStorage.setItem('currentUser', JSON.stringify(userLogin));
          this.currentUserSubject.next(userLogin);
          this.alertService.showSucess('Usuário logado!', 'Sucesso');
          isAuthenticated = true;
          subject.next(isAuthenticated);
        },
        error => {
          console.log(error)
          this.alertService.showError('Erro ao Logar, verifique as credenciais informada.', 'Error')
          subject.next(isAuthenticated);
        });

        return subject.asObservable();

  }

  authenticateAdmin(authenticate: Login) {
    let url = `${baseUrl}`;
    let subject = new Subject<boolean>();
    let isAuthenticated: boolean = false;
    this.http.post<any>(url, authenticate, { observe: 'response' })
      .subscribe(
        response => {
          let userLogin = this.getUserLogin(response);

          if (userLogin.cliente.usuario.perfis.includes('ADMIN')) {
            localStorage.setItem('currentUserAdmin', JSON.stringify(userLogin));
            this.currentUserAdminSubject.next(userLogin);
            this.alertService.showSucess('Usuário logado!', 'Sucesso');
            isAuthenticated = true;
            subject.next(isAuthenticated);
          } 
        },
        error => {
          console.log(error)
          this.alertService.showError('Erro ao Logar, verifique as credenciais informada.', 'Error')
          subject.next(isAuthenticated);
        });

        return subject.asObservable();
  }

  private getUserLogin(response) {
    let userLogin = new UserLogin();
    userLogin.token = response.headers.get('authorization')
    userLogin.isLogged = true;
    userLogin.cliente = new ClienteJwt();
    userLogin.cliente.id = response.body['id'];
    userLogin.cliente.nome = response.body['nome'];
    userLogin.cliente.cpf = response.body['cpf'];
    userLogin.cliente.celular = response.body['celular'];
    userLogin.cliente.usuario = new Usuario();
    userLogin.cliente.usuario.id = response.body['usuario']['id'];
    userLogin.cliente.usuario.email = response.body['usuario']['email'];
    userLogin.cliente.usuario.login = response.body['usuario']['login'];
    userLogin.cliente.usuario.perfis = response.body['usuario']['perfis'];
    userLogin.cliente.cotas = response.body['cotas'];

    return userLogin;
  }

  logarComo(login: string){
    let url = `${baseUrlLoginExists}/auth/${login}/logarComo`;
    return this.http.get<any>(url);
  }

  logout() {
    this.currentUserSubject.next(new UserLogin());
    localStorage.removeItem('currentUser');
  }

  logoutAdmin() {
    this.currentUserAdminSubject.next(new UserLogin());
    localStorage.removeItem('currentUserAdmin');
  }

}
