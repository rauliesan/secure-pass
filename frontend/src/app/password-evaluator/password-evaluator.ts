import { Component, inject, signal } from '@angular/core';
import { PasswordService } from '../services/password-service';
import { PasswordResponse } from '../models/password-response-interface';

@Component({
  selector: 'app-password-evaluator',
  imports: [],
  templateUrl: './password-evaluator.html',
  styleUrl: './password-evaluator.css',
})
export class PasswordEvaluator {


  private passwordService = inject(PasswordService);

  productos = signal<PasswordResponse | null>(null);

}
