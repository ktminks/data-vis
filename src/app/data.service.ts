// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly baseUrl = 'http://localhost:4201/api';

  constructor(private http: HttpClient) { }

  getTopology(): Observable<any> {
    return this.http.get(`${this.baseUrl}/topology`);
  }
  getPovertyData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/poverty`);
  }
}
