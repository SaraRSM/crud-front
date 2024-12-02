import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient, 
    private snackBar: MatSnackBar) { }

  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_URL}/listarTodaTienda`)
    .pipe(catchError( (error) => this.handlerError(error)));
  }

  new(producto: any): Observable<any[]> {
    return this.http.post<any[]>(`${environment.API_URL}/crearProductos?nombre=${ producto.nombre }&precio=${ producto.precio }&existencia=${ producto.existencia }`, producto)
    .pipe(catchError( (error) => this.handlerError(error)));
  }

  update(id: number, producto: any): Observable<any[]> {
    return this.http.put<any[]>(`${environment.API_URL}/actualizarProducto/${ id }`, producto)
    .pipe(catchError( (error) => this.handlerError(error)));
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.API_URL}/eliminarProductos/${ id }`)
    .pipe(catchError( (error) => this.handlerError(error)));
  }

  handlerError(error: any): Observable<never> {
    let errorMessage  = "Ocurrio un error";
    if (error) {
      errorMessage = `${ error.error.message }`;
    }

    this.snackBar.open(errorMessage, '', {
      duration: 5 * 1000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })

    return throwError(errorMessage);
  }
}
