import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../app.config';
import { AppConfig } from '../app.config';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
    private weatherUrl: string;

    constructor(
        private http: HttpClient,
        @Inject(APP_CONFIG) private config: AppConfig
    ) { 
      this.weatherUrl = this.config.weatherUrl;
     }

  getCity(city: string): Observable<any> {
      return this.http.get(`${this.weatherUrl}/city/`+ city); 
  }
  getWeather(city : any) : Observable<any>{
    
    const params = new HttpParams()
    .set('name', city.name)
    .set('lat', city.lat)
    .set('lon', city.lon);

  return this.http.get(`${this.weatherUrl}/weather`, { params });
  }
}