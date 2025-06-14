import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

interface Nivel {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: 'lectura' | 'preguntas' | 'examen';
  puntajeMaximo?: number;
}

interface Tema {
  id: string;
  titulo: string;
  descripcion: string;
  subtemas?: Tema[];
  niveles: Nivel[];
}

interface Instructor {
  id: string;
  nombre: string;
}

interface Curso {
  id: string;
  titulo: string;
  slug: string;
  descripcion: string;
  imagen: string;
  temas: Tema[];
  instructor: Instructor;
  fechaCreacion: string;
  nivel: 'principiante' | 'intermedio' | 'avanzado';
  duracionEstimada: number;
  puntajeMaximo: number;
  estado: 'activo' | 'borrador';
}

@Component({
  selector: 'app-curso-detalle',
  standalone: true,
  templateUrl: './curso-detalle.component.html',
  styleUrls: ['./curso-detalle.component.css'],
  imports: [CommonModule]
})
export class CursoDetalleComponent {
  curso: Curso = {
    id: '1',
    titulo: 'Curso de Ciencia',
    slug: 'curso-de-ciencia',
    descripcion: 'Este curso explora los fundamentos de la ciencia, el método científico y su aplicación en la vida diaria. (Aquí irían al menos 500 palabras de descripción).',
    imagen: 'https://ejemplo.com/imagen.jpg',
    temas: [
      {
        id: 't1',
        titulo: 'Introducción a la Ciencia',
        descripcion: 'Conoce qué es la ciencia y sus ramas.',
        niveles: [
          {
            id: 'n1',
            titulo: 'Lectura: ¿Qué es la ciencia?',
            descripcion: 'Definición y ramas de la ciencia.',
            tipo: 'lectura'
          },
          {
            id: 'n2',
            titulo: 'Preguntas de repaso',
            descripcion: 'Preguntas sobre la lectura.',
            tipo: 'preguntas'
          }
        ]
      }
      // ...más temas
    ],
    instructor: {
      id: 'u1',
      nombre: 'Juan Pérez'
    },
    fechaCreacion: '2025-06-08T12:00:00Z',
    nivel: 'principiante',
    duracionEstimada: 10,
    puntajeMaximo: 100,
    estado: 'activo'
  };

  iconoNivel(tipo: Nivel['tipo']) {
    switch (tipo) {
      case 'lectura': return 'bi bi-book text-primary';
      case 'preguntas': return 'bi bi-question-circle text-warning';
      case 'examen': return 'bi bi-clipboard-check text-success';
      default: return 'bi bi-journal';
    }
  }

  constructor(private location: Location, private router: Router) {}

  volver() {
    this.location.back();
  }

  verNivel(cursoId: string, temaIndex: number, nivelIndex: number) {
    this.router.navigate([
      '/cursos', cursoId, 'tema', temaIndex, 'nivel', nivelIndex
    ]);
  }

  irACursoForm(nivel: any) {
    // Puedes pasar el tipo y el id del nivel como query params o state
    this.router.navigate(['/curso-form'], {
      queryParams: {
        tipo: nivel.tipo,
        titulo: nivel.titulo,
        descripcion: nivel.descripcion
        // Puedes agregar más datos si lo necesitas
      },
      state: { nivel }
    });
  }
}
