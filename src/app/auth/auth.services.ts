import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../app.config';
import { AppConfig } from '../app.config';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private authUrl: string;

    constructor(
        private http: HttpClient,
        @Inject(APP_CONFIG) private config: AppConfig,
        @Inject(PLATFORM_ID) private platformId: Object // Injetando a plataforma
    ) {
        this.authUrl = this.config.authUrl;
    }

  // Método de login
  login(credentials: { username: string; password: string }): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {  // Verifica se está rodando no navegador
      return this.http.post(`${this.authUrl}/login`, credentials); 
    } else {
      // Retorne um erro ou um Observable vazio se estiver no servidor
      throw new Error("Não pode fazer login no servidor");
    }
  }

  // Método para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) { 
      return !!localStorage.getItem('token'); 
    }// Verifica se o token está presente no localStorage
    return false;
  }

  // Método para fazer logout
  logout(): void {
    if (isPlatformBrowser(this.platformId)) { 
      localStorage.removeItem('token'); // Remove o token do localStorage
    }
    
  }
}