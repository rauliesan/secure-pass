import { Routes } from '@angular/router';
import { Landing } from './landing/landing';
import { PasswordEvaluator } from './password-evaluator/password-evaluator';

export const routes: Routes = [
    {path: '', component: Landing},
    {path: 'evaluate', component: PasswordEvaluator},
    { path: '**', redirectTo: '' }
];
