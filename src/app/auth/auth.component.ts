import { Component } from '@angular/core';
import { AuthService } from './auth.services';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { MatDialog } from '@angular/material/dialog';

import {ErrorMessageDirectiveComponent} from '../directives/error-message/error-message.directive';


@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class AuthComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private dialog: MatDialog, private authService: AuthService, private router: Router) {  }

  onSubmit(): void {
    const credentials = { username: this.username, password: this.password };
    
    this.authService.login(credentials).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('name', response.name );
        this.router.navigate(['/weather-dashboard']);
      },
      (error) => {
        const errorMessage = error.error.message;        
        this.showErrorModal(errorMessage || 'Login falhou. Verifique as credenciais e tente novamente.');
      }
    );
  }
  
  private showErrorModal(message: string): void {
    this.dialog.open(ErrorMessageDirectiveComponent, {
      width: '400px',
      data: { message }
    });
  }

  registerUser (): void {
    this.router.navigate(['/create-user']);
  }
}
