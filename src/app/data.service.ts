import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private mockApiUrl = 'http://localhost:4201/api';

  constructor(private http: HttpClient) {}

  getTrendsData(): Observable<any> {
    return this.getPovertyData();
  }
  getMapData(): Observable<any> {
    return this.getPovertyData();
  }
  getPovertyData(): Observable<any> {
    return this.http.get<any>(`${this.mockApiUrl}/poverty`);
  }
}
