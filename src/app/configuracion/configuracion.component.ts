import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css'],
  imports: [FormsModule]
})
export class ConfiguracionComponent {
  modoOscuro = false;

  constructor(private router: Router) {
    // Mantener preferencia al recargar
    this.modoOscuro = localStorage.getItem('modoOscuro') === 'true';
    this.setModoOscuro(this.modoOscuro);
  }

  toggleModoOscuro() {
    // NO invertir, solo aplicar el valor actual
    this.setModoOscuro(this.modoOscuro);
    localStorage.setItem('modoOscuro', String(this.modoOscuro));
  }

  setModoOscuro(activo: boolean) {
    if (activo) {
      document.body.classList.add('modo-oscuro');
    } else {
      document.body.classList.remove('modo-oscuro');
    }
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}
