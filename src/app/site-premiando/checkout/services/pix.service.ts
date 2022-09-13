import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegysterPixPayment } from '../models/regyster-pix-payment';
import { PixPaymentResponse } from '../models/regyster-pix-payment-response';
import { environment } from 'environments/environment';


const baseUrl: string = environment.baseUrlPix;

@Injectable({ providedIn: 'root' })
export class PixService {

  constructor(private http: HttpClient) { }

  regysterPayment(payment: RegysterPixPayment): Observable<PixPaymentResponse> {
    let url = `${baseUrl}/process_payment`;
    return this.http.post<PixPaymentResponse>(url, payment);
  }
}
