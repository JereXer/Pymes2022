import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
//
import { ListaArticulosComponent } from './components/lista-articulos/lista-articulos.component';
import { ArticuloFamiliaComponent } from './components/articulo-familia/articulo-familia.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DetalleArticuloComponent } from './components/detalle-articulo/detalle-articulo.component';

import { HttpClientModule } from '@angular/common/http';
//etapa 3
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
//etapa 5
import { ReactiveFormsModule } from "@angular/forms";
//etapa 8
import {
  NgbPaginationModule,
  NgbModalModule
} from "@ng-bootstrap/ng-bootstrap";
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MyInterceptor } from "./shared/my-interceptor";

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule, NgbModalModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/inicio', pathMatch: 'full' },
      { path: 'inicio', component: InicioComponent },
      { path: 'listaarticulos', component: ListaArticulosComponent },
      { path: 'articulosfamilias', component: ArticuloFamiliaComponent },
      { path: 'articulo/:id', component: DetalleArticuloComponent },
      { path: 'articulos', component: ArticulosComponent }
    ])
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    InicioComponent,
    ListaArticulosComponent,
    ArticuloFamiliaComponent,
    ArticulosComponent,
    DetalleArticuloComponent,
    MenuComponent,
    ModalDialogComponent
  ],
  entryComponents: [ModalDialogComponent],
  providers:[ 
    { provide: APP_BASE_HREF, useValue: "/" },
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
