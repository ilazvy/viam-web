import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  formularioLogin: FormGroup;
  loginError: string | null = null;
  intentosFallidos = 0;
  bloqueoActivo = false;
  tiempoBloqueo = 30000;

  constructor(private fb: FormBuilder, private router: Router, private location: Location) {
    this.formularioLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  volver() {
    this.location.back();
  }

  iniciarSesion() {
    if (this.bloqueoActivo) return;

    if (this.formularioLogin.invalid) {
      this.formularioLogin.markAllAsTouched();
      return;
    }

    const { email, password } = this.formularioLogin.value;
    this.loginError = null;

    // Simulación de respuesta:
    if (email === 'usuario@viam.com' && password === '123456') {
      this.intentosFallidos = 0;
      this.router.navigate(['/cursos']);
    } else {
      this.manejarErrorLogin();
    }
  }

  private manejarErrorLogin() {
    this.intentosFallidos++;
    this.loginError = 'Email o contraseña incorrectos';

    if (this.intentosFallidos >= 3) {
      this.bloqueoActivo = true;
      this.loginError = `Demasiados intentos fallidos. Intenta de nuevo en ${this.tiempoBloqueo / 1000} segundos.`;
      setTimeout(() => {
        this.bloqueoActivo = false;
        this.loginError = null;
        this.intentosFallidos = 0;
      }, this.tiempoBloqueo);
    }
  }
}
