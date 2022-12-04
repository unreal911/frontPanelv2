import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  constructor() { }
  public imagenes: string[] = ['img1', 'img2', 'img3', 'img4']
  ngOnInit(): void {
  }
}
