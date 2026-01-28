import { Component, inject, signal } from '@angular/core';
import { PasswordService } from '../services/password-service';
import { PasswordResponse } from '../models/password-response-interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-evaluator',
  imports: [ReactiveFormsModule],
  templateUrl: './password-evaluator.html',
  styleUrl: './password-evaluator.css',
})
export class PasswordEvaluator {


  private passwordService = inject(PasswordService);

  passwordResponse = signal<PasswordResponse | null>(null);

  mostrarPassword = false;

  formularioPassword = new FormGroup({
    password: new FormControl('', [Validators.required])
  })

  evaluarPassword(){
    if(this.formularioPassword.valid){
      this.passwordService.evaluate(this.formularioPassword.value.password ?? '').subscribe( {
        next: data => {
          this.passwordResponse.set(data);
        },
      })
    }
  }

  nivelScore(){
    
  }

}
