import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Sorteio } from 'app/models/sorteio';
import { CadastroSorteio } from 'app/models/cadastro-sorteio';
import { FullSorteio } from 'app/models/full-sorteio';
import { StatusCompra } from 'app/models/status-compra';


const baseUrl: string = environment.baseUrl;
const CACHE_SIZE = 10;
const REFRESH_INTERVAL = 60000;

@Injectable({ providedIn: 'root' })
export class SorteioService {
  private cache$: Observable<Sorteio[]>;

  constructor(private http: HttpClient) { }

  get sorteios(){
    if (!this.cache$) {

      const timer$ = timer(0, REFRESH_INTERVAL);

      this.cache$ = timer$.pipe(
        switchMap(_ => this.list()),
        shareReplay(CACHE_SIZE)
      );
    }

    return this.cache$;
  }

  create(sorteio: CadastroSorteio | FullSorteio): Observable<CadastroSorteio> {
    let url = `${baseUrl}/sorteios`;
    sorteio.id = 0;

    return this.http.post<CadastroSorteio>(url, sorteio);
  }

  update(sorteio: CadastroSorteio | FullSorteio): Observable<CadastroSorteio> {
    let url = `${baseUrl}/sorteios/${sorteio.id}`;
    return this.http.put<CadastroSorteio>(url, sorteio);
  }

  definirGanhador(idSorteio: number, numeroCota: number): Observable<CadastroSorteio> {
    let url = `${baseUrl}/sorteios/${idSorteio}/ganhador?numeroCotaGanhador=${numeroCota}`;
    return this.http.post<CadastroSorteio>(url, {});
  }

  delete(id: number){
    let url = `${baseUrl}/sorteios/${id}`;
    return this.http.delete<any>(url);
  }

  downloadPDF(idSorteio: number, nomeSorteio: string): Observable<any> {
    let url = `${baseUrl}/sorteios/${idSorteio}/${nomeSorteio}/export/pdf`;

    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(url, { headers: headers, responseType: 'blob' });
  }

  list(): Observable<Sorteio[]> {
    let url = `${baseUrl}/sorteios`;

    return this.http.get<Sorteio[]>(url)
  }

  getById(id: number): Observable<FullSorteio> {
    let url = `${baseUrl}/sorteios/${id}`;

    return this.http.get<FullSorteio>(url)
  }

  loadImagem(id: number){
    let url = `${baseUrl}/sorteios/${id}/imagem`;

    return this.http.get<any>(url)
  }

  listStatus(): Observable<StatusCompra[]> {
    let url = `${baseUrl}/compras/status`;

    return this.http.get<StatusCompra[]>(url)
  }

  listSorteioStatus(): Observable<StatusCompra[]> {
    let url = `${baseUrl}/sorteios/status`;

    return this.http.get<StatusCompra[]>(url)
  }

}
