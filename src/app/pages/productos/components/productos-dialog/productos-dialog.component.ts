import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ProductosService } from '../../services/productos.service';
import { BaseForm } from '../../../../shared/utils/base-form';

enum Action {
  EDIT = 'edit',
  NEW = 'new'
}


@Component({
  selector: 'app-productos-dialog',
  standalone: false,
  
  templateUrl: './productos-dialog.component.html',
  styleUrl: './productos-dialog.component.scss'
})
export class ProductosDialogComponent implements OnInit, OnDestroy {

  actionTODO = Action.NEW;
  titleButton = "Guardar";
  private destroy$ = new Subject<any>();
  productoForm = this.fb.group({
    id: [''],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    precio: ['', [Validators.required, Validators.min(1), Validators.max(999) ]],
    existencia: ['', [Validators.required, Validators.min(1), Validators.max(999)]],
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ProductosDialogComponent>, 
              private fb: FormBuilder,
              public baseForm: BaseForm,
              private productosSvc: ProductosService) { }

  ngOnInit(): void {
    this.patchData();
  }

  patchData() {
    if (this.data.producto.id) {
      this.actionTODO = Action.EDIT;
      this.titleButton = "Actualizar";
      this.productoForm.patchValue({
        id: this.data?.producto.id,
        nombre: this.data?.producto.nombre,
        precio: this.data?.producto.precio,
        existencia: this.data?.producto.existencia,
      });
      
    } else {
      this.titleButton = "Guardar";
      this.actionTODO = Action.NEW;
    }
  }
  
  onSave() {
    if (this.productoForm.invalid) return;

    const { id, ...producto } = this.productoForm.getRawValue();

    // Se realizara la inserción
    if (this.actionTODO == Action.NEW)  {

      this.productosSvc.new(producto)
      .pipe(takeUntil(this.destroy$))
      .subscribe( (res) => {
        this.dialogRef.close(res);
      });
    }  else { // se actualizan los datos

      var cveProducto = parseInt(id!);
      this.productosSvc.update(cveProducto, producto)
      .pipe(takeUntil(this.destroy$))
      .subscribe( (res) => {
        this.dialogRef.close(res);
      });
    }
  }

  onClean() {}

  ngOnDestroy(): void {
      this.destroy$.next({});
      this.destroy$.complete();
  }
  
}
