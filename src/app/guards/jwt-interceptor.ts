import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/services/login.service';
import { NotificationService } from 'app/services/toast.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, private router: Router, 
    private alertService: NotificationService) { }

  validaUrlAdmin(request: HttpRequest<any>){
    
    if(request.url.includes('api/compras')   || request.url.includes('/api/modeloMensagem') ||
       request.url.includes('api/dashboard') || request.url.includes('/api/compras/status') || 
       request.url.includes('/api/sorteios/status') || request.url.includes('/api/sorteios/upload') ||
       request.url.includes('/api/ganhadores') || request.url.includes('/logarComo') ||
       request.url.includes('/api/bancos') || request.url.includes('/imagem') ||
       request.url.includes('/ganhador') ||
       request.url.includes('/api/clientes') ||
       request.url.includes('/api/contas') ||
       request.url.includes('/api/sorteios') ||
       request.url.includes('/api/transacoes/compra') ||
       request.url.includes('/api/transacoes') ||
       request.url.includes('/api/slideshow') ||
       request.url.includes('/minhascompras/checkout') ||
       request.url.includes('/minhascompras')
       ){
      return true;
    }
    
    return false;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authenticationService.currentUserValue;
    const currentUserAdmin = this.authenticationService.currentUserAdminValue;
    
    if (currentUser && currentUser.token) {
      request = this.setHeader(request, currentUser.token);
    } 
    
    if(currentUserAdmin && currentUserAdmin.token && this.validaUrlAdmin(request)){
      request = this.setHeader(request, currentUserAdmin.token);
    }

    return next.handle(request).toPromise()
      .catch(err => {
        // onError
        if (err instanceof HttpErrorResponse) {
            if (err.status === 401 || err.status === 203) {
              this.authenticationService.logout();
              this.alertService.showWarning('Realizar novamente o login!','Sessão Expirada')
              document.getElementById('menuMobile').style.setProperty("display", "none", "important");
              document.getElementById('logoHeader').style.setProperty("display", "block", "important");
              this.router.navigate(['/principal']);
            }
        }
        return Observable.throw(err);
    }) as any;;
  }

  private setHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    request = request.clone({
      setHeaders: {
        Authorization: `${token}`
      }
    });

    return request;
  }
}
