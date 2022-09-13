import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compras } from '../models/compras';
import { StatusCompra } from '../models/status-compra';
import { environment } from 'environments/environment';
import { CartDetail } from '../models/cart-detail';


const baseUrl: string = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class ComprasService {


  constructor(private http: HttpClient) { }

  createCompras(compras: Compras): Observable<Compras> {
    let url = `${baseUrl}/compras`;
    compras.id = 0;
    return this.http.post<Compras>(url, compras);
  }

  cancelarCompra(id: number): Observable<Compras> {
    let url = `${baseUrl}/compras/${id}`;
    return this.http.post<Compras>(url, {});
  }

  reservarCompra(id: number): Observable<Compras> {
    let url = `${baseUrl}/compras/${id}/cotas`;
    return this.http.post<Compras>(url, {});
  }

  updateCompras(compras: Compras): Observable<Compras> {
    let url = `${baseUrl}/compras/${compras.id}`;
    return this.http.put<Compras>(url, compras);
  }

  getCartDetail(id: number): Observable<CartDetail> {
    let url = `${baseUrl}/compras/${id}`;
    return this.http.get<CartDetail>(url);
  }

  list(): Observable<Compras[]> {
    let url = `${baseUrl}/compras`;

    return this.http.get<Compras[]>(url)
  }

  listStatus(): Observable<StatusCompra[]> {
    let url = `${baseUrl}/sorteios/status`;

    return this.http.get<StatusCompra[]>(url)
  }

}
