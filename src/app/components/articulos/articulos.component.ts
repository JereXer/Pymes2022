import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../models/articulos';
import { ArticuloFamilia } from '../../models/articulo-familia';
import { MockArticulosService } from '../../services/mock-articulos.service';
import { MockArticulosFamiliasService } from '../../services/mock-articulos-familias.service';
import { ArticulosFamiliasService } from '../../services/articulos-familias.service';
//etapa 5
import { FormGroup, FormControl, Validators } from '@angular/forms';
//etapa 6
import { ArticulosService } from '../../services/articulos.service';
//etapa 8
import { ModalDialogService } from '../../services/modal-dialog.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css'],
})
export class ArticulosComponent implements OnInit {
  Titulo = 'Articulos';
  TituloAccionABMC: { [index: string]: string } = {
    A: '(Agregar)',
    B: '(Eliminar)',
    M: '(Modificar)',
    C: '(Consultar)',
    L: '(Listado)',
  };
  AccionABMC: string = 'L'; // inicia en el listado de articulos (buscar con parametros)

  Mensajes = {
    SD: ' No se encontraron registros...',
    RD: ' Revisar los datos ingresados...',
  };

  Items: Articulo[] | null = null;
  RegistrosTotal: number = 1;
  Familias: ArticuloFamilia[] | null = null;
  Pagina = 1; // inicia pagina 1

  //creacion del paginador
  NumPaginador: number[] | null = null;

  cargarPaginador() {
    this.NumPaginador = Array(Math.ceil(Math.floor(this.RegistrosTotal / 10)))
      .fill(0)
      .map((x, i) => i + 1);
  }

  // opciones del combo activo
  OpcionesActivo = [
    { Id: null, Nombre: '' },
    { Id: true, Nombre: 'SI' },
    { Id: false, Nombre: 'NO' },
  ];

  constructor(
    //etapa 8
    private articulosService: ArticulosService,
    private articulosFamiliasService: ArticulosFamiliasService,
    private modalDialogService: ModalDialogService
  ) {}

  ngOnInit() {
    this.GetFamiliasArticulos();
  }

  GetFamiliasArticulos() {
    this.articulosFamiliasService.get().subscribe((res: ArticuloFamilia[]) => {
      this.Familias = res;
    });
  }

  GetArticuloFamiliaNombre(Id: number) {
    let Nombre = this.Familias.find((x) => x.IdArticuloFamilia === Id)?.Nombre;
    return Nombre;
  }

  Agregar() {
    this.AccionABMC = 'A';
    this.FormRegistro.reset({ Activo: true, IdArticulo: 0 });
  }

  // Buscar segun los filtros, establecidos en FormRegistro
  Buscar() {
    //etapa 8
    this.modalDialogService.BloquearPantalla();

    this.articulosService
      .get(
        this.FormBusqueda.value.Nombre,
        this.FormBusqueda.value.Activo,
        this.Pagina
      )
      .subscribe((res: any) => {
        this.Items = res.Items;
        this.RegistrosTotal = res.RegistrosTotal;
        //Paginador cargado cuando damos a "buscar"
        this.cargarPaginador();
        this.modalDialogService.DesbloquearPantalla();
      });
  }

  // Obtengo un registro especifico según el Id
  BuscarPorId(Item: Articulo, AccionABMC: string) {
    window.scroll(0, 0); // ir al incio del scroll

    this.articulosService.getById(Item.IdArticulo).subscribe((res: any) => {
      const itemCopy = { ...res }; // hacemos copia para no modificar el array original del mock

      //formatear fecha de  ISO 8601 a string dd/MM/yyyy
      if (itemCopy.FechaAlta == null) {
        var arrFecha = null;
      } else {
        var arrFecha = itemCopy.FechaAlta.substr(0, 10).split('-');
        itemCopy.FechaAlta =
          arrFecha[2] + '/' + arrFecha[1] + '/' + arrFecha[0];
      }

      this.FormRegistro.patchValue(itemCopy);
      this.AccionABMC = AccionABMC;
    });
  }

  Consultar(Item: Articulo) {
    this.BuscarPorId(Item, 'C');
  }

  // comienza la modificacion, luego la confirma con el metodo Grabar
  Modificar(Item: Articulo) {
    if (!Item.Activo) {
      this.modalDialogService.Alert(
        'No puede modificarse un registro Inactivo.'
      );
      //alert("No puede modificarse un registro Inactivo.");
      return;
    }
    this.BuscarPorId(Item, 'M');
  }

  // grabar tanto altas como modificaciones
  Grabar() {
    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy: Articulo = {
      IdArticulo: this.FormRegistro.value.IdArticulo,
      Nombre: this.FormRegistro.value.Nombre,
      Precio: this.FormRegistro.value.Precio,
      Stock: this.FormRegistro.value.Stock,
      CodigoDeBarra: this.FormRegistro.value.CodigoDeBarra,
      IdArticuloFamilia: +this.FormRegistro.value.IdArticuloFamilia,
      FechaAlta: this.FormRegistro.value.FechaAlta,
      Activo: this.FormRegistro.value.Activo,
    };

    //convertir fecha de string dd/MM/yyyy a ISO para que la entienda webapi
    var arrFecha = itemCopy.FechaAlta.substr(0, 10).split('/');
    if (arrFecha.length == 3)
      itemCopy.FechaAlta = new Date(
        +arrFecha[2],
        +arrFecha[1] - 1,
        +arrFecha[0]
      ).toISOString();

    // agregar post
    if (this.AccionABMC == 'A') {
      this.articulosService.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        //alert('Registro agregado correctamente.');
        this.modalDialogService.Alert('Registro agregado correctamente.');
        this.Buscar();
      });
    } else {
      // modificar put
      this.articulosService
        .put(itemCopy.IdArticulo, itemCopy)
        .subscribe((res: any) => {
          this.Volver();
          //alert('Registro modificado correctamente.');
          this.modalDialogService.Alert('Registro modificado correctamente.');
          this.Buscar();
        });
    }
  }

  ActivarDesactivar(Item: Articulo) {
    this.modalDialogService.Confirm(
      'Esta seguro de ' +
        (Item.Activo ? 'desactivar' : 'activar') +
        ' este registro?',
      undefined,
      undefined,
      undefined,
      () =>
        this.articulosService
          .delete(Item.IdArticulo)
          .subscribe((res: any) => this.Buscar()),
      null
    );
  }

  // Volver desde Agregar/Modificar
  Volver() {
    this.AccionABMC = 'L';
  }

  ImprimirListado() {
    alert('Sin desarrollar...');
  }

  FormBusqueda = new FormGroup({
    Nombre: new FormControl(null),
    Activo: new FormControl(null),
  });

  FormRegistro = new FormGroup({
    IdArticulo: new FormControl(0),
    Nombre: new FormControl(''),
    Precio: new FormControl(null),
    Stock: new FormControl(null),
    CodigoDeBarra: new FormControl(''),
    IdArticuloFamilia: new FormControl(''),
    FechaAlta: new FormControl(''),
    Activo: new FormControl(true),
  });
}
