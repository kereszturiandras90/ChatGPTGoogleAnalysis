import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languagesUrl = 'assets/languages.json';

  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }

  getLanguages(): Observable<any[]> {
    return this.http.get<any[]>(this.languagesUrl).pipe(
      catchError(this.handleError<any[]>('getLanguages', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.snackbar.open('Backend returned code ${error.status}, body was: ${error.error}', 'Close', {
        duration: 5000 // Adjust the duration as needed
      });
      return of(result as T);
    };
  }
}