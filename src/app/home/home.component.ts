import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
    imports: [RouterModule],
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent {
  constructor(private router: Router) {}

  irALogin() {
    this.router.navigate(['/login']);
  }

  irARegistro() {
    this.router.navigate(['/registro']);
  }
}
  