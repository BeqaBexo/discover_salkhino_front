import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateToure ,Toure } from './toure-detail-service.model';

@Injectable({
  providedIn: 'root'
})
export class ToureDetailService {

  toureUrl: string='https://localhost:7237/api/Toure';
  private dictionaryUrl: string = 'https://localhost:7237/api/Dictionary';
    
      
      listToure: Toure[] = [];   
      toureData: Toure = new Toure()
      
      constructor(
        private myhttp: HttpClient
      ) { }
    
      getAllToure(): Observable<Toure[]> {
          return this.myhttp.get<Toure[]>(this.toureUrl);
      }
    
     getTranslations(language: string): Observable<TranslateToure> {
        const url = `${this.dictionaryUrl}/${language}`;
        return this.myhttp.get<TranslateToure>(url);
      }     
  
}
