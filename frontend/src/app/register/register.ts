import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink], // Importante para el formulario y los links
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  
  private authService = inject(AuthService);
  private router = inject(Router);

  // Formulario reactivo para registro
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    // Añadimos MinLength para evitar contraseñas vacías o muy cortas
    password: new FormControl('', [Validators.required, Validators.minLength(4)]) 
  });

  mostrarPassword = false;
  errorMessage = '';

  onSubmit() {
    if (this.registerForm.invalid) return;

    const { email, password } = this.registerForm.value;

    this.authService.register(email!, password!).subscribe({
      next: (response) => {
        // Al registrarse, guardamos el usuario (Auto-login)
        localStorage.setItem('currentUser', JSON.stringify(response));
        
        // Redirigimos directamente al evaluador
        this.router.navigate(['/evaluate']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'No se pudo crear la cuenta. El email podría estar en uso.';
      }
    });
  }
}