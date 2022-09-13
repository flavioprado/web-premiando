import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { RegisterPayment } from 'app/models/register-payment';


const baseUrl: string = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class RegisterPaymentService {


  constructor(private http: HttpClient) { }

  createRegisterPayment(registerPayment: RegisterPayment): Observable<RegisterPayment> {
    let url = `${baseUrl}/transacoes/compra/${registerPayment.idCompra}`;
    return this.http.post<RegisterPayment>(url, registerPayment);
  }

  updateRegisterPayment(id: number): Observable<RegisterPayment> {
    let url = `${baseUrl}/transacoes/${id}`;
    return this.http.post<RegisterPayment>(url, null);
  }

  cancelarRegisterPayment(id: number): Observable<RegisterPayment> {
    let url = `${baseUrl}/transacoes/${id}`;
    return this.http.delete<RegisterPayment>(url);
  }

  list(): Observable<RegisterPayment[]> {
    let url = `${baseUrl}/transacoes`;

    return this.http.get<RegisterPayment[]>(url)
  }

}
