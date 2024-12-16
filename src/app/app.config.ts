import { InjectionToken } from '@angular/core';

export interface AppConfig {
  jwtLocalStorageKey: string;
  apiUrl: string;
  authUrl: string;
  userUrl: string;
  weatherUrl: string;
  cityUrl: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config', {
  providedIn: 'root',
  factory: () => ({
    jwtLocalStorageKey: 'jwt_token',
    apiUrl: 'https://localhost:7099/api',
    authUrl: 'https://localhost:7099/api/auth',
    userUrl: 'https://localhost:7099/api/usuarios',
    weatherUrl: 'https://localhost:7099/api/weatherForecast',
    cityUrl: 'https://localhost:7099/api/cidadesFavoritas',
  })
});
