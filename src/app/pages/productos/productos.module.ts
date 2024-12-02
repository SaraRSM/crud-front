import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { ProductosDialogComponent } from './components/productos-dialog/productos-dialog.component';


@NgModule({
  declarations: [
    ProductosComponent,
    ProductosDialogComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ProductosModule { }
