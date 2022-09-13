import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebSiteSlideShow } from 'app/models/website-slideshow';
import { environment } from 'environments/environment';
import { Observable, timer } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';


const baseUrl: string = environment.baseUrl;
const CACHE_SIZE = 1;
const REFRESH_INTERVAL = 600000;

export class IFile {
  file: string;
}

@Injectable({
  providedIn: 'root'
})
export class SlideShowService {
  constructor(private http: HttpClient) { }

  updateSlideShow(slideshow: WebSiteSlideShow, id: number): Observable<WebSiteSlideShow> {
    let url = `${baseUrl}/slideshow/${id}`;
    return this.http.put<WebSiteSlideShow>(url, slideshow);
  }

  upload(file: string, fileName: string){
    let url = `${baseUrl}/slideshow/upload`;

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', '*/*');

    const formData = new FormData();
    formData.append('file', file, fileName);

    return this.http.post<string>(url, formData);
  }

  findSlideShowById() {
    let url = `${baseUrl}/slideshow`;
    return this.http.get<WebSiteSlideShow[]>(url);
  }
}


