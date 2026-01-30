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

  // Formulario reactivo
  loginForm = new FormGroup({
    email: new FormControl ('', [Validators.required, Validators.email]),
    password: new FormControl ('', [Validators.required])
  });


  mostrarPassword = false;
  errorMessage = '';

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    // Llamamos al método login(user, password) de tu servicio
    this.authService.login(email!, password!).subscribe({
      next: (response) => {
        // Guardamos el usuario en localStorage para usar el ID luego en el evaluador
        localStorage.setItem('currentUser', JSON.stringify(response));
        
        // Redirigimos al evaluador
        this.router.navigate(['/evaluate']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Credenciales incorrectas o error de conexión.';
      }
    });
  }
}