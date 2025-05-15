import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AlbomService {
  private baseUrl = `${environment.apiUrl}/api`; 
  private albomUrl = `${this.baseUrl}/Albom`;
  private imageUrl = `${this.baseUrl}/Image`;

  constructor(private http: HttpClient) {}

  addAlbom(albomData: any): Observable<number> {
    return this.http.post<number>(this.albomUrl, albomData);
  }

  uploadImages(formData: FormData): Observable<any> {
    return this.http.post(`${this.imageUrl}/upload-multiple`, formData);
  }
}
