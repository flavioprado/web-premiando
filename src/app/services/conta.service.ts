import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Conta } from 'app/models/conta';


const baseUrl: string = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class ContaService {

  constructor(private http: HttpClient) { }

  list(): Observable<Conta[]> {
    let url = `${baseUrl}/contas`;

    return this.http.get<Conta[]>(url)
  }

}
