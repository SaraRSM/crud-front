import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { ProductosService } from './services/productos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductosDialogComponent } from './components/productos-dialog/productos-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-productos',
  standalone: false,
  
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<any>();
  displayedColumns: string[] = ['nombre', 'precio', 'existencia', 'actions'];
  dataSource = new MatTableDataSource();
  constructor(private productosSvc: ProductosService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
      this.listarProductos();
  }

  listarProductos() {
    this.productosSvc.getProductos().pipe(takeUntil(this.destroy$)).subscribe( (productos: any[]) => {
      this.dataSource.data = productos;
    });
  }

  onOpenModal(producto = {}) {
    const dialogRef = this.dialog.open(ProductosDialogComponent, {
      width: '800px',
      height: '70%',
      data: {
        title: 'Registro de Productos',
        producto
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.snackBar.open("Producto guardado correctamente", '', {
            duration: 5 * 1000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          })

          this.listarProductos();
        }
      });
  }

  onDelete(id: number) {
    this.productosSvc.delete(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe( (result: any) => {
      this.snackBar.open("Producto eliminado correctamente", '', {
        duration: 5 * 1000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })

      this.listarProductos();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }


}
