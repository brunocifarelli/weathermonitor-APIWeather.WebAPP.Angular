// user.service.ts
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../app.config';  // Importando o InjectionToken
import { AppConfig } from '../app.config';  // Importando o tipo AppConfig

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userUrl: string;

    constructor(
        private http: HttpClient,
        @Inject(APP_CONFIG) private config: AppConfig  // Injetando o APP_CONFIG
    ) {
        this.userUrl = this.config.userUrl;  // Atribuindo a URL da configuração
    }

    createUser(newUser: { username: string; password: string; nome: string }): Observable<any> {
        return this.http.post(`${this.userUrl}/register-user`, newUser);
    }
}