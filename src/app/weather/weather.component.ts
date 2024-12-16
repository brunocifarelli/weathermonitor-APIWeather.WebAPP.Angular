import { Component } from '@angular/core';
import { WeatherService } from './weather.services';
import { WeatherModalComponent } from './weather-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog , MatDialogModule  } from '@angular/material/dialog';
import {FavoriteCitiesService} from '../favoriteCity/favorite-cities.services';
import {ErrorMessageDirectiveComponent} from '../directives/error-message/error-message.directive';

@Component({
    selector: 'app-weather',
    templateUrl: './weather-dashboard.component.html',
    styleUrls: ['./weather-dashboard.component.css'],
    imports:  [CommonModule, FormsModule, MatIconModule, MatButtonModule, MatCardModule, MatDialogModule]
})
export class WeatherComponent {
    userName: string = '';
    searchTerm: string = '';
    cities: any[] = [];
    searchPerformed: boolean = false;
    showFavorites: boolean = false;
    searchedCity: string = '';
  
    constructor(private weatherService: WeatherService, private router: Router, private dialog: MatDialog,
         private favoriteCitiesService: FavoriteCitiesService) {}
  
    ngOnInit(): void {
    const storedName = localStorage.getItem('name');
    this.userName = storedName ? storedName : 'Usuário';
    }

    onSearchChange(): void {
      if (this.searchTerm.length >= 3) {
        this.searchCity();
      }
    }
  
    searchCity(): void {
        this.weatherService.getCity(this.searchTerm).subscribe({
            next: (data) => {
              this.cities = data;
              this.searchPerformed = true;
              this.showFavorites = false;
              this.searchedCity = `Cidades encontradas para o termo: ${this.searchTerm}`;
              
            },
            error: (error) => {
              this.showErrorModal(error.error.message || 'Ocorreu um erro.');
              this.cities = [];
              this.searchPerformed = true;
              this.showFavorites = false;
            },
            complete: () => {
            }
          });
          
    }

    consultCity(city : any): any {       
        const searchWeather = {name: city.name, lat: city.lat, lon: city.lon};
        this.weatherService.getWeather(searchWeather).subscribe(
          (data) => {
            this.openWeatherModal(data);
          },
          (error) => {
            this.showErrorModal(error.error.message || 'Ocorreu um erro ao consultar a cidade.');
          }
        );
      }
      
    removeFavoriteCity (city : any): any {       
        const cityId = city.favoriteCityId;
        this.favoriteCitiesService.removeFavoriteCity(cityId).subscribe(
          (data) => {
                this.getFavoritesCities();
          },
          (error) => {
            this.showErrorModal(error.error.message || 'Ocorreu um erro ao consultar a cidade.');
          }
        );
      }

      saveFavoriteCity(city: any): void {
         if(this.showFavorites){
            this.removeFavoriteCity(city);
         }else{
             const newFavoriteCity = {name: `${city.name}, ${city.state}, ${city.country}`, latitude: city.lat, longitude: city.lon};
             this.favoriteCitiesService.createFavoriteCity(newFavoriteCity).subscribe(
                 (data) => {
                     
                 },
                 (error) => {
                     this.showErrorModal(error.error.message || 'Ocorreu um erro ao salvar a cidade favorita.');
                 },
             );
         }
      }

      private showErrorModal(message: string): void {
        this.dialog.open(ErrorMessageDirectiveComponent, {
          width: '400px',
          data: { message }
        });
      }

    getFavoritesCities(): void {
        this.favoriteCitiesService.getFavoritesCities().subscribe(
            (data) => {
              this.searchPerformed = false;
              this.showFavorites = true;
              this.cities = data;
              this.searchedCity = `Cidades favoritas`;
            },
            (error) => {
                this.cities = [];
                this.searchPerformed = false;
                this.showFavorites = true;
            },
        );
    }
    
    openWeatherModal(city: any): void {
        this.dialog.open(WeatherModalComponent, {
              width: '500px',
              data: city, 
        });
    }

    logout(): void {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      this.router.navigate(['/login']);
    }
  }