import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashBoard } from '../models/dashboard';
import { environment } from 'environments/environment';


const baseUrl: string = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class DashBoardService {


  constructor(private http: HttpClient) { }

  list(): Observable<DashBoard> {
    let url = `${baseUrl}/dashboard`;

    return this.http.get<DashBoard>(url)
  }
}
