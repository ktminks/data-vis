// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:4201/api';

  constructor(private http: HttpClient) {}

  getPovertyData(): Observable<{ count: number; year: number }[]> {
    return this.http.get<{ count: number; year: number }[]>(`${this.baseUrl}/poverty`);
  }
}
