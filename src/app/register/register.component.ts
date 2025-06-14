import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegisterComponent {
  formularioRegistro: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location
  ) {
    this.formularioRegistro = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['usuario', Validators.required]
    });
  }

  registrar() {
    if (this.formularioRegistro.invalid) {
      this.formularioRegistro.markAllAsTouched();
      return;
    }

    const nuevoUsuario = {
      ...this.formularioRegistro.value,
      fechaRegistro: new Date(),
      estado: 'activo'
    };

    console.log('Usuario registrado:', nuevoUsuario);
    this.router.navigate(['/login']);
  }

  volver() {
    this.location.back();
  }
}
