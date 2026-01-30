import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register'; // 1. Cambiado de 'Register' a 'RegisterComponent'
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegisterComponent', () => { // 2. Nombre descriptivo corregido
  let component: RegisterComponent;   // 3. Tipo corregido
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Como es un componente Standalone, se pone en imports
      imports: [RegisterComponent, ReactiveFormsModule],
      // Necesitamos proveer HttpClient y Router porque el componente los usa
      providers: [
        provideHttpClient(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Ejecuta el ciclo de vida inicial
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});