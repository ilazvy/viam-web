import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-no-encontrado',
  standalone: true,
  imports: [],
  templateUrl: './no-encontrado.component.html',
  styleUrls: ['./no-encontrado.component.css']
})
export class NoEncontradoComponent {
  constructor(private location: Location) {}

  volver() {
    this.location.back();
  }
}
