import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  
  private authService = inject(AuthService);
  private router = inject(Router);

  
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]) 
  });

  mostrarPassword = false;
  errorMessage = '';

  onSubmit() {
    if (this.registerForm.invalid){
      return
    };

    this.authService.register(this.registerForm.value.email!, this.registerForm.value.password!).subscribe({
      next: (response) => {

        localStorage.setItem('currentUser', JSON.stringify(response));
        
        this.router.navigate(['/evaluate']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'No se pudo crear la cuenta. El email podría estar en uso.';
      }
    });
  }
}