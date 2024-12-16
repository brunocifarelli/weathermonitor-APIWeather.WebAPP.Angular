import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.services';  
import { RouterModule } from '@angular/router'; // Importando o RouterModule
import { CommonModule } from '@angular/common'; // Importe o CommonModule


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true, // Componente independente
    imports: [RouterModule, CommonModule] // O RouterModule já está importado aqui
})
export class AppComponent {
    title = 'WeatherMonitor';

    constructor(private authService: AuthService, private router: Router) {
     }
    
    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
        try {
          return  this.authService.isAuthenticated();
        } catch (err) {
          return false;
        }
    }
}