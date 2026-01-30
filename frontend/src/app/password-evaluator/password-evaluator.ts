import { Component, inject, signal } from '@angular/core';
import { PasswordService } from '../services/password-service';
import { PasswordResponse } from '../models/password-response-interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { UserResponse } from '../models/user-response-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-evaluator',
  imports: [ReactiveFormsModule],
  templateUrl: './password-evaluator.html',
  styleUrl: './password-evaluator.css',
})
export class PasswordEvaluator {


  private passwordService = inject(PasswordService);
  private authService = inject(AuthService);
  private router = inject(Router);

  passwordResponse = signal<PasswordResponse | null>(null);
  userResponse = signal<UserResponse | null>(null);

  mostrarPassword = false;

  formularioPassword = new FormGroup({
    password: new FormControl('', [Validators.required])
  })

  evaluarPassword(){
    if(this.formularioPassword.valid){
      this.passwordService.evaluate(this.formularioPassword.value.password ?? '').subscribe( {
        next: data => {
          this.passwordResponse.set(data);
          this.updateContador();
        },
      })
    }
  }

  // Para que al cargarse la página ya aparezca
  ngOnInit(){
    this.updateContador();
  }

  updateContador(){
    let userJSON = localStorage.getItem("currentUser");
    if(!userJSON){
      this.router.navigate([""]);
      return;
    }
    let user = JSON.parse(userJSON);
    this.authService.contador(user.id).subscribe( {
      next: data => {
        this.userResponse.set(data);
      }
    })
  }
}
