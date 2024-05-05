import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Translation } from '../models/translation.model';
import {Observable, catchError, of} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TrnslationsService {

   baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }

  getAllTranslations(): Observable<Translation[]>{
     return  this.http.get<Translation[]>(this.baseApiUrl + '/api/Translations');
    
  }
  addTranslation(addTranslationRequest: Translation): Observable<Translation> {
    console.log(this.baseApiUrl);
    return this.http.post<Translation>(this.baseApiUrl + '/api/GoogleTranslate', addTranslationRequest);
    //return this.http.get<Translation>(this.baseApiUrl + '/api/GoogleTranslate');
  }
  getLatestTranslation(): Observable<Translation>{
    return  this.http.get<Translation>(this.baseApiUrl + '/api/GoogleTranslate');
  }

  addRating(addRatingRequest: Translation): Observable<Translation> {
   return  this.http.put<Translation>(this.baseApiUrl + '/api/GoogleTranslate', addRatingRequest);
  }
  
  detectLanguage(addTranslationRequest: Translation): Observable<Translation> {
    return this.http.post<Translation>(this.baseApiUrl + '/api/LanguageDetection', addTranslationRequest);
  }
  
   handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.snackbar.open('Backend returned code ${error.status}, body was: ${error.error}', 'Close', {
        duration: 5000 // Adjust the duration as needed
      });
      return of(result as T);
    };
  }
}
