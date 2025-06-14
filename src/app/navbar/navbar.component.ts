import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: []
})
export class NavbarComponent {
  constructor(private router: Router) {}

  irCursoActual() {
    // Cambia el id por el curso actual del usuario si lo tienes
    this.router.navigate(['/cursos', 'ciencia']);
  }

  irMaterias() {
    this.router.navigate(['/cursos']);
  }

  irPerfil() {
    this.router.navigate(['/perfil']);
  }

  irConfiguracion() {
    this.router.navigate(['/configuracion']);
  }
}


