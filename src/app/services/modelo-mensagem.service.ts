import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModeloMensagem } from 'app/models/modelo-mensagem';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';


const baseUrl: string = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ModeloMensagemService {

  constructor(private http: HttpClient) { }

  createModeloMensagem(modeloMensagem: ModeloMensagem): Observable<ModeloMensagem> {
    let url = `${baseUrl}/modeloMensagem`;
    modeloMensagem.id = 0;
    return this.http.post<ModeloMensagem>(url, modeloMensagem);
  }

  updateModeloMensagem(modeloMensagem: ModeloMensagem): Observable<ModeloMensagem> {
    let url = `${baseUrl}/modeloMensagem/${modeloMensagem.id}`;
    return this.http.put<ModeloMensagem>(url, modeloMensagem);
  }

  deleteModeloMensagem(idDodeloMensagem: number): Observable<ModeloMensagem> {
    let url = `${baseUrl}/modeloMensagem/${idDodeloMensagem}`;
    return this.http.delete<ModeloMensagem>(url);
  }

  list(): Observable<ModeloMensagem[]> {
    let url = `${baseUrl}/modeloMensagem`;

    return this.http.get<ModeloMensagem[]>(url)
  }
}
