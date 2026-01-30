import { Routes } from '@angular/router';
import { Landing } from './landing/landing';
import { PasswordEvaluator } from './password-evaluator/password-evaluator';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';

export const routes: Routes = [
    {path: '', component: Landing},
    {path: 'evaluate', component: PasswordEvaluator},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    { path: '**', redirectTo: '' }
];
