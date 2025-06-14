import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // <-- IMPORTANTE

declare var bootstrap: any; // Para usar el modal de Bootstrap

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // <-- AGREGA CommonModule AQUÍ
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  perfilForm: FormGroup;
  modalTipo: 'inscritos' | 'completados' | 'medallas' = 'inscritos';
  modalTitulo = '';

  constructor(
    private location: Location,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.perfilForm = this.fb.group({
      foto: ['https://randomuser.me/api/portraits/men/32.jpg'],
      biografia: ['Biografía breve del usuario, máximo dos líneas para mantener claridad y limpieza.'],
      inscritos: [5],
      completados: [3],
      medallas: [8],
      puntos: [1200],
      ultimoAcceso: ['5 de junio de 2025, 14:23'],
      cursos: this.fb.array([
        this.fb.group({
          nombre: ['Curso de HTML'],
          nivelesCompletados: [4],
          nivelesTotales: [5]
        }),
        this.fb.group({
          nombre: ['Curso de JavaScript'],
          nivelesCompletados: [2],
          nivelesTotales: [5]
        }),
        this.fb.group({
          nombre: ['Curso de Python'],
          nivelesCompletados: [10],
          nivelesTotales: [10]
        }),
      ])
    });
  }

  get cursos() {
    return this.perfilForm.get('cursos') as FormArray;
  }

  calcularProgreso(curso: any): number {
    const completados = curso.value.nivelesCompletados || 0;
    const totales = curso.value.nivelesTotales || 1;
    return Math.round((completados / totales) * 100);
  }

  abrirModal(tipo: 'inscritos' | 'completados' | 'medallas') {
    this.modalTipo = tipo;
    if (tipo === 'inscritos') this.modalTitulo = 'Cursos Inscritos';
    if (tipo === 'completados') this.modalTitulo = 'Cursos Completados';
    if (tipo === 'medallas') this.modalTitulo = 'Tus Medallas';
    setTimeout(() => {
      const modal = new bootstrap.Modal(document.getElementById('perfilModal'));
      modal.show();
    }, 0);
  }

  volver() {
    this.location.back();
  }

  cerrarSesion() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['/home']);
    }
  }

  getCursosCompletados() {
    return this.cursos.controls.filter(curso => this.calcularProgreso(curso) === 100);
  }
}
