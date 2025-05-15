import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Place, TranslatePlace } from './place-detail-service.model';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

placeUrl:string=`${environment.apiUrl}/api/Place`; 
private dictionaryUrl: string = `${environment.apiUrl}/api/Dictionary`; 

  
  listPlace: Place[] = [];
     
  transportData: Place = new Place()
  
  constructor(
    private myhttp: HttpClient
  ) { }

  getAllPlace(): Observable<Place[]> {
      return this.myhttp.get<Place[]>(this.placeUrl);
  }

 getTranslations(language: string): Observable<TranslatePlace> {
    const url = `${this.dictionaryUrl}/${language}`;
    return this.myhttp.get<TranslatePlace>(url);
  }  

}

