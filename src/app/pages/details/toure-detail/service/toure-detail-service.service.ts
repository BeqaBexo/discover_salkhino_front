import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateToure ,Toure } from './toure-detail-service.model';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ToureDetailService {

  toureUrl: string=`${environment.apiUrl}/api/Toure`; 
  private dictionaryUrl: string = `${environment.apiUrl}/api/Dictionary`; 
    
      
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
