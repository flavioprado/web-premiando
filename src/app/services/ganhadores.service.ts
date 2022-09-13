import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Ganhadores } from '../models/ganhadores';
import { GanhadoresCadastro } from '../models/ganhadores-cadastro';


const baseUrl: string = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class GanhadoresService {

  constructor(private http: HttpClient) { }

  createGanhadores(ganhador: GanhadoresCadastro): Observable<GanhadoresCadastro> {
    let url = `${baseUrl}/ganhadores`;
    return this.http.post<GanhadoresCadastro>(url, ganhador);
  }

  updateGanhadores(ganhador: GanhadoresCadastro, id: number): Observable<GanhadoresCadastro> {
    let url = `${baseUrl}/ganhadores/${id}`;
    return this.http.put<GanhadoresCadastro>(url, ganhador);
  }

  deleteGanhadores(id: number): Observable<Ganhadores> {
    let url = `${baseUrl}/ganhadores/${id}`;
    return this.http.delete<Ganhadores>(url);
  }

  findGanhadoreById(id: number): Observable<GanhadoresCadastro> {
    let url = `${baseUrl}/ganhadores/${id}`;
    return this.http.get<GanhadoresCadastro>(url);
  }

  list(): Observable<Ganhadores[]> {
    let url = `${baseUrl}/ganhadores`;

    return this.http.get<Ganhadores[]>(url)
  }

  defaultGanhadores(url: string){
    return this.http.get<any>(url);
  }

}
