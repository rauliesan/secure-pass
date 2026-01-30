import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class LoginComponent {
  
  private authService = inject(AuthService);
  private router = inject(Router);

  
  loginForm = new FormGroup({
    email: new FormControl ('', [Validators.required, Validators.email]),
    password: new FormControl ('', [Validators.required])
  });

  mostrarPassword = false;
  errorMessage = '';

  onSubmit() {
    if (this.loginForm.invalid){
      this.errorMessage = "Completa todos los campos de forma correcta";
      return;
    };

    this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!).subscribe({
      next: (response) => {

        localStorage.setItem('currentUser', JSON.stringify(response));
        
        this.router.navigate(['/evaluate']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Credenciales incorrectas o error de conexión.';
      }
    });
  }
}