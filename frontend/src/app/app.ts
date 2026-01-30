import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  private router = inject(Router);

  // Se ejecuta al llamar a la variable user en el html
  get user() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  logOut(){
    localStorage.removeItem("currentUser");
    this.router.navigate(['/']);
  }
}
