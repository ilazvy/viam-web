import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curso-list',
  standalone: true,
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css'],
  imports: [CommonModule]
})
export class CursoListComponent {
  constructor(private router: Router) {}

  // Ciencia se muestra aparte en el HTML
  cursosColor = [
    {
      id: 'tecnologia',
      titulo: 'Tecnología',
      descripcion: 'Aprende sobre computadoras, internet, robótica y el futuro digital.',
      icono: 'bi bi-cpu',
      bgClass: 'bg-primary bg-opacity-10',
      textClass: 'text-primary',
      btnClass: 'btn-outline-primary'
    },
    {
      id: 'ingenieria',
      titulo: 'Ingeniería',
      descripcion: 'Construye, diseña y resuelve problemas con proyectos de ingeniería.',
      icono: 'bi bi-gear-wide-connected',
      bgClass: 'bg-purple bg-opacity-10',
      textClass: 'text-purple',
      btnClass: 'btn-outline-dark'
    },
    {
      id: 'artes',
      titulo: 'Artes',
      descripcion: 'Explora tu creatividad con música, pintura, teatro y más.',
      icono: 'bi bi-palette',
      bgClass: 'bg-warning bg-opacity-10',
      textClass: 'text-warning',
      btnClass: 'btn-outline-warning'
    },
    {
      id: 'matematicas',
      titulo: 'Matemáticas',
      descripcion: 'Juega y aprende con números, lógica y desafíos matemáticos.',
      icono: 'bi bi-calculator',
      bgClass: 'bg-danger bg-opacity-10',
      textClass: 'text-danger',
      btnClass: 'btn-outline-danger'
    }
  ];

  irPerfil() {
    this.router.navigate(['/perfil']);
  }

  irCurso(id: string) {
    this.router.navigate(['/cursos', id]);
  }
}


