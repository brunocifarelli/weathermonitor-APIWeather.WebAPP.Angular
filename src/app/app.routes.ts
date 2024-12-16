import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CreateUserComponent } from './user/create-user.component';
import {WeatherComponent} from './weather/weather.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'weather-dashboard', component: WeatherComponent },
  { path: '**', redirectTo: '/login' },
];