import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { CotasSorteio } from '../models/cotas-sorteio';
import { FullSorteio } from '../models/full-sorteio';
import { environment } from 'environments/environment';


const baseUrl: string = environment.baseUrl;
const CACHE_SIZE = 1;
const REFRESH_INTERVAL = 72000000;

@Injectable({ providedIn: 'root' })
export class CotasSorteioService {
  currentIdSorteioAtivo: number;

  constructor(private http: HttpClient) { }

  listCotasSorteio(statusCota: number): Observable<CotasSorteio[]> {
    let url = `${baseUrl}/cotas/sorteio/${this.currentIdSorteioAtivo}/status/${statusCota}`;

    return this.http.get<CotasSorteio[]>(url)
  }

  getSorteioById(idSorteio: number): Observable<FullSorteio> {
    let url = `${baseUrl}/sorteios/${idSorteio}`;

    return this.http.get<FullSorteio>(url)
  }

  reservarCota(idSorteio: number, idCliente: number, idCotas: number[]): Observable<CotasSorteio[]> {
    let url = `${baseUrl}/cotas/sorteio/${idSorteio}/cliente/${idCliente}`;
    return this.http.post<CotasSorteio[]>(url,{idCotas: idCotas})
  }

}
