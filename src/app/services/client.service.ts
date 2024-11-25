import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private readonly clientUrl = 'http://localhost:8080/client';

  constructor(private readonly http: HttpClient) {}

  getClientsList(): Observable<any> {
    return this.http.get(`${this.clientUrl}/all`);
  }

  getClientBySharedKey(sharedKey: string): Observable<any> {
    const params = new HttpParams().set('sharedKey', sharedKey);
    return this.http.get(`${this.clientUrl}/searchBySharedKey`, {params});
  }

  createClient(client: any): Observable<any> {
    return this.http.post(`${this.clientUrl}`, client);
  }
}
