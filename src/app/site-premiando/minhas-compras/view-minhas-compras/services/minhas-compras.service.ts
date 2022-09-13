import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { MinhasCompras } from '../models/minhas-compras';
import { shareReplay, switchMap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { AuthenticationService } from 'app/services/login.service';


const baseUrl: string = environment.baseUrl;
const CACHE_SIZE = 100;
const REFRESH_INTERVAL = 600000;

@Injectable({ providedIn: 'root' })
export class MinhasComprasService {
  private cache$: Observable<MinhasCompras[]>;

  constructor(private http: HttpClient, private loginService: AuthenticationService) { }

  get minhasCompras(){
    let currentUser = this.loginService.currentUserValue;
    if (!this.cache$) {

      const timer$ = timer(0, REFRESH_INTERVAL);

      this.cache$ = timer$.pipe(
        switchMap(_ => this.listMinhasCompras(+currentUser.cliente.id)),
        shareReplay(CACHE_SIZE)
      );
    }

    return this.cache$;
  }

  listMinhasCompras(idCliente: number): Observable<MinhasCompras[]> {
    let url = `${baseUrl}/clientes/${idCliente}/minhascompras`;

    return this.http.get<MinhasCompras[]>(url)
  }

  listMeusNumeros(idCliente: number, idSOrteio): Observable<MinhasCompras[]> {
    let url = `${baseUrl}/clientes/${idCliente}/${idSOrteio}/meusnumeros`;

    return this.http.get<MinhasCompras[]>(url)
  }

  listMinhaCompra(idCompra: number): Observable<MinhasCompras> {
    let url = `${baseUrl}/clientes/${idCompra}/minhascompras/checkout`;

    return this.http.get<MinhasCompras>(url)
  }
}
