import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-articulos',
  templateUrl: './lista-articulos.component.html',
  styleUrls: ['./lista-articulos.component.css']
})
export class ListaArticulosComponent implements OnInit { //apenas carga implementa el constructor, pero no puedo hacer referencia la template, y despues implementa el elemento oninit que es como el load en c#


   titulo: string = 'Lista de Árticulos';
   lowprice: string = 'https://cdn.shopify.com/s/files/1/0869/0934/files/best-price-guarantee-logo-Electric_Spokes_Company_large.png?v=1527959964';
   vip: string = 'https://cdn.streamelements.com/uploads/22f27488-50ac-472f-ad6a-4662f7fae4ae.gif';
   articulos: any[] = [
       {
           id: 2,
           descripcion: 'Articulo X',
           codigo: 'xsd-143',
           cantidad: 139,
           precio: 1221.40,
           puntaje: 4,
           imagen: "https://data.whicdn.com/images/283530560/original.png"
          },
          {
            id: 5,
            descripcion: 'Articulo Y',
            codigo: 'dlg-912',
            cantidad: 336,
            precio: 499.99,
            puntaje: 3,
            imagen: "https://cdn.pixabay.com/photo/2020/04/20/16/28/pizza-5068912_1280.png"
       }       
   ];
  


  constructor() { }

  ngOnInit() {
  }

  IncrementarPrecio(art: any)
  {
    art.precio++;
  }

  DecrementarPrecio(art: any)
  {
    art.precio--;
  }
}