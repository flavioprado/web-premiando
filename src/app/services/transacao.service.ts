import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transacao } from '../models/transacao';
import { environment } from 'environments/environment';
import { RelatorioFinanceiro } from '../models/relatorio-financeiro';


const baseUrl: string = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class TransacaoService {


  constructor(private http: HttpClient) { }

  list(): Observable<Transacao[]> {
    let url = `${baseUrl}/transacoes`;

    return this.http.get<Transacao[]>(url)
  }

  getArquivo(id: number): Observable<any> {
    let url = `${baseUrl}/transacoes/${id}/arquivo`;

    return this.http.get<any>(url)
  }

  getRelatorioFinanceiro(): Observable<RelatorioFinanceiro[]>{
    let url = `${baseUrl}/transacoes/relatorio-financeiro`;

    return this.http.get<RelatorioFinanceiro[]>(url)
  }

}
