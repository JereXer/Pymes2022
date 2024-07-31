import { Component, OnInit } from '@angular/core';

@Component({
 selector: 'detalle-articulo',
 templateUrl: './detalle-articulo.component.html',
 styleUrls: ['./detalle-articulo.component.css']
})
export class DetalleArticuloComponent implements OnInit {

 constructor() { }

 titulo: string = 'Artículo';
 articulo: any;

 ngOnInit() {
 }

}
