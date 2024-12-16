import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './create-user.services'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {ErrorMessageDirectiveComponent} from '../directives/error-message/error-message.directive';

@Component({
    selector: 'app-register',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.css'],
    imports: [CommonModule, FormsModule]
})
export class CreateUserComponent {
    username: string = '';
    password: string = '';
    nome: string = '';
    confirmPassword: string = '';
    errorMessage: string = '';
    successMessage: string = '';

    constructor(private userService: UserService, private router: Router, private dialog: MatDialog) { }

    // Método para registrar um novo usuário
    register(): void {
        this.errorMessage = '';  // Limpa mensagens de erro
        this.successMessage = ''; // Limpa mensagens de sucesso

        if (this.password !== this.confirmPassword) {
            this.errorMessage = 'As senhas não coincidem!';
            return;
        }

        const newUser = { username: this.username, password: this.password, nome: this.nome };

        this.userService.createUser(newUser).subscribe(
            (response) => {
                this.successMessage = 'Usuário cadastrado com sucesso!';
                this.router.navigate(['/dashboard']);
            },
            (error) => {
                const errorMessage = error.error.message;        
                this.showErrorModal(errorMessage || 'Erro ao cadastrar. Tente novamente.');
            },
            
        );

    }
    private showErrorModal(message: string): void {
        this.dialog.open(ErrorMessageDirectiveComponent, {
          width: '400px',
          data: { message }
        });
      }
}