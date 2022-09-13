import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';


const baseUrl: string = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class UploadService {


  constructor(private http: HttpClient) { }

  upload(file: string, fileName: string, servico: string){
    let url = `${baseUrl}/${servico}/upload`;

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', '*/*');

    const formData = new FormData();
    formData.append('file', file, fileName);

    return this.http.post<string>(url, formData);
  }
}
