import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateTransp } from './service.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class Service 
{

  private dictionaryUrl: string = `${environment.apiUrl}/api/Dictionary`; 


    constructor(private myhttp: HttpClient) {}
  
    getTranslations(language: string): Observable<TranslateTransp> {
      const url = `${this.dictionaryUrl}/${language}`;
      return this.myhttp.get<TranslateTransp>(url);
    }
}
