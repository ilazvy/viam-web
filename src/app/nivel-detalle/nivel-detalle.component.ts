import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  selector: 'app-nivel-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nivel-detalle.component.html',
  styleUrls: ['./nivel-detalle.component.css']
})
export class NivelDetalleComponent implements OnInit {
  cursoId = '';
  temaIndex = 0;
  nivelIndex = 0;
  nivel: Nivel | null = null;
  temaNombre = '';

  // Simulación de cursos por id, igual que en curso-detalle.component.ts
  cursosTemas: { [key: string]: Curso } = {
    '1': {
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
        // ...más temas si lo deseas
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
    }
    // ...otros cursos si lo deseas
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.cursoId = this.route.snapshot.paramMap.get('cursoId') || '';
    this.temaIndex = +(this.route.snapshot.paramMap.get('temaIndex') || 0);
    this.nivelIndex = +(this.route.snapshot.paramMap.get('nivelIndex') || 0);

    const curso = this.cursosTemas[this.cursoId];
    if (curso && curso.temas[this.temaIndex]) {
      this.temaNombre = curso.temas[this.temaIndex].titulo;
      this.nivel = curso.temas[this.temaIndex].niveles[this.nivelIndex];
    }
  }

  irACursoForm() {
    if (!this.nivel) return;
    this.router.navigate(['/curso-form'], {
      queryParams: {
        tipo: this.nivel.tipo,
        titulo: this.nivel.titulo,
        descripcion: this.nivel.descripcion
      },
      state: { nivel: this.nivel }
    });
  }

  volverAlCurso() {
    this.router.navigate(['/cursos', this.cursoId]);
  }
}
