import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  private router = inject(Router);

  get user() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  logOut(){
    localStorage.removeItem("currentUser");
    this.router.navigate(['/']);
  }
}
