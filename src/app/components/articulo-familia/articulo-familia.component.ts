import { Component, OnInit } from '@angular/core';
import { ArticuloFamilia, ArticulosFamilias } from '../../models/articulo-familia';
import { MockArticulosFamiliasService } from "../../services/mock-articulos-familias.service";
import { ArticulosFamiliasService } from "../../services/articulos-familias.service";


@Component({
  selector: 'app-articulo-familia',
  templateUrl: './articulo-familia.component.html',
  styleUrls: ['./articulo-familia.component.css']
})
export class ArticuloFamiliaComponent implements OnInit {

  Titulo = "Articulos Familias"
  Items: ArticuloFamilia[] = [];

  constructor( 
    private articulosFamiliasService: ArticulosFamiliasService
    //private articulosFamiliasService: MockArticulosFamiliasService
    ) { }

  ngOnInit() {
    this.GetFamiliasArticulos()
  }

  GetFamiliasArticulos(){
    this.articulosFamiliasService.get()
    .subscribe((data:ArticuloFamilia[]) => {this.Items = data;});
  }
}