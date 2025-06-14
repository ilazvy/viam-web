import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [CommonModule], // <-- AGREGA CommonModule AQUÍ
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.css']
})
export class CursoFormComponent {
  tipo: string | null = null;
  titulo: string | null = null;
  descripcion: string | null = null;
  nivel: any = null;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.tipo = params['tipo'];
      this.titulo = params['titulo'];
      this.descripcion = params['descripcion'];
    });
    // Si usas state:
    const nav = window.history.state;
    if (nav && nav.nivel) {
      this.nivel = nav.nivel;
    }
  }
}
