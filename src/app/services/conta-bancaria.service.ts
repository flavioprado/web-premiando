import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContaBancaria } from '../models/conta-bancaria';
import { AddContaBancaria } from '../models/add-conta-bancaria';
import { TipoConta } from '../models/tipo-conta';
import { Banco } from '../models/banco';
import { TipoContaBancaria } from '../models/tipo-conta-bancaria';
import { BancoNacional } from '../models/banco-nacional';
import { environment } from 'environments/environment';


const baseUrl: string = environment.baseUrl;
const baseNacionalUrl: string = "https://olinda.bcb.gov.br/olinda/servico/CCR/versao/v1/odata/InstituicoesFinanceirasAutorizadas?%24format=json&%24filter=Pais%20eq%20'Brasil'"

@Injectable({ providedIn: 'root' })
export class ContaBancariaService {


  constructor(private http: HttpClient) { }

  createContaBancaria(contaBancaria: AddContaBancaria): Observable<AddContaBancaria> {
    let url = `${baseUrl}/contas`;
    contaBancaria.id = 0;
    return this.http.post<AddContaBancaria>(url, contaBancaria);
  }

  updateContaBancaria(contaBancaria: AddContaBancaria): Observable<AddContaBancaria> {
    let url = `${baseUrl}/contas/${contaBancaria.id}`;
    return this.http.put<AddContaBancaria>(url, contaBancaria);
  }

  deleteContaBancaria(id: number): Observable<AddContaBancaria> {
    let url = `${baseUrl}/contas/${id}`;
    return this.http.delete<AddContaBancaria>(url);
  }

  list(): Observable<ContaBancaria[]> {
    let url = `${baseUrl}/contas`;

    return this.http.get<ContaBancaria[]>(url)
  }

  listTipoConta(): Observable<TipoConta[]> {
    let url = `${baseUrl}/contas/tiposContas`;

    return this.http.get<TipoConta[]>(url)
  }

  findById(id: number): Observable<AddContaBancaria> {
    let url = `${baseUrl}/contas/${id}`;

    return this.http.get<AddContaBancaria>(url)
  }

  listTipoContaBancaria(): Observable<TipoContaBancaria[]> {
    let url = `${baseUrl}/contas/tiposContasBancarias`;

    return this.http.get<TipoContaBancaria[]>(url)
  }

  listBancos(): Observable<Banco[]> {
    let url = `${baseUrl}/bancos`;

    return this.http.get<Banco[]>(url)
  }

  listBancosNacional(): Observable<BancoNacional[]> {
    let url = `${baseNacionalUrl}`;

    return this.http.get<BancoNacional[]>(url)
  }

  

}
