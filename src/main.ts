import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_CONFIG } from './app/app.config';
import { HttpClientModule } from '@angular/common/http';


console.log('APP_CONFIG:', {
  apiUrl: 'https://localhost:7099/api',
  authUrl: 'https://localhost:7099/api/auth',
  userUrl: 'https://localhost:7099/api/usuarios',
  cityUrl: 'https://localhost:7099/api/cidadesFavoritas',
  weatherUrl: 'https://localhost:7099/api/weatherForecast',
  jwtLocalStorageKey: 'jwt_token',
});

const bootstrap = () => {
  return bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(HttpClientModule),
      importProvidersFrom(RouterModule.forRoot(routes)),
      {
        provide: APP_CONFIG,
        useValue: {
          apiUrl: 'https://localhost:7099/api',
          authUrl: 'https://localhost:7099/api/auth',
          userUrl: 'https://localhost:7099/api/usuarios',
          cityUrl: 'https://localhost:7099/api/cidadesFavoritas',
          weatherUrl: 'https://localhost:7099/api/weatherForecast',
          jwtLocalStorageKey: 'jwt_token',
        },      
      },
    ],
  })
    .catch((err) => console.error('Erro no bootstrap:', err));
};

bootstrap();