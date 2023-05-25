import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CustomResponsePayload, Response } from 'src/app/shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  api: string = environment.api;

  constructor(private http: HttpClient) {}

  get<T = any>(url: string): Observable<CustomResponsePayload<T>> {
    const path = `${this.api}/${url}`;
    return this.http.get<Response<T>>(path).pipe(map((res) => res.payload!));
  }

  post<T = any>(url: string, body: any): Observable<CustomResponsePayload<T>> {
    const path = `${this.api}/${url}`;
    return this.http.post<Response<T>>(path, body).pipe(map((res) => res.payload!));
  }
}
