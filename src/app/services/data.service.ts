// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GeoJsonData {
  type: string;
  features: Feature[];
}

export interface Feature {
  type: string;
  properties: {
    name: string;
    avg_poverty_rate: number;
    global_avg_poverty_rate: number;
    timeframe: string;
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:4201/api';

  constructor(private http: HttpClient) {}

  getPovertyData(type: string): Observable<{ count: number; year: number }[]> {
    if (type === 'map')
      return this.http.get<{ count: number; year: number }[]>(`${this.baseUrl}/poverty/map`);
    else
      return this.http.get<{ count: number; year: number }[]>(`${this.baseUrl}/poverty/graph`);
  }
  getGeoJsonData(): Observable<GeoJsonData> {
    const dataUrl = "assets/data/countries.geojson"
    return this.http.get<GeoJsonData>(dataUrl);
  }
}