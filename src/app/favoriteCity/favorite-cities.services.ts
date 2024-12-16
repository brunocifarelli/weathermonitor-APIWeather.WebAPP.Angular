import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../app.config';
import { AppConfig } from '../app.config';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FavoriteCitiesService {
    private cityUrl: string;

    constructor(
        private http: HttpClient,
        @Inject(APP_CONFIG) private config: AppConfig
    ) { 
      this.cityUrl = this.config.cityUrl;
     }

     
    createFavoriteCity(newFavorite: {name: string, latitude: string, longitude: string}): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`${this.cityUrl}/create-favorite-city`, newFavorite, { headers });
  }
  
  getFavoritesCities(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
  }); 
  return this.http.get(`${this.cityUrl}/favorites-cities`, { headers });
}

removeFavoriteCity(cityId: string): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  return this.http.delete(`${this.cityUrl}/${cityId}`, { headers });
}


  
}