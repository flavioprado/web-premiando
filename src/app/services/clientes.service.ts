import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clientes } from '../models/clientes';
import { environment } from 'environments/environment';


const baseUrl: string = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class ClientesService {


  constructor(private http: HttpClient) { }


  fetchClientesByUserId(userId: string): Observable<Clientes[]> {
    let orderBy = 'expectedClosureDate';
    let orderType = 'DESC';

    let url = `${baseUrl}/clientes/search?salesOwnerId=${userId}&orderBy=${orderBy}&orderType=${orderType}`;

    return this.http.get<Clientes[]>(url);
  }

  fetchClientesById(id: string): Observable<Clientes> {
    let url = `${baseUrl}/clientes/${id}`;

    return this.http.get<Clientes>(url);
  }

  createClientes(cliente: Clientes): Observable<Clientes> {
    let url = `${baseUrl}/clientes`;
    cliente.id = 0;
    return this.http.post<Clientes>(url, cliente);
  }

  updateClientes(cliente: Clientes): Observable<Clientes> {
    let url = `${baseUrl}/clientes/${cliente.id}`;
    return this.http.put<Clientes>(url, cliente);
  }

  list(): Observable<Clientes[]> {
    let url = `${baseUrl}/clientes`;

    return this.http.get<Clientes[]>(url)
  }

  exportContact(dataCadastro: string): Observable<any> {
    let url = `${baseUrl}/clientes/${dataCadastro}/export`;

    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'text/csv');
    return this.http.get(url, { headers: headers, responseType: 'blob' });
  }

}
