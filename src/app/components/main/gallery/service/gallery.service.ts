import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private apiUrl = `${environment.apiUrl}/api/Albom`;

  constructor(private http: HttpClient) {}

  getAllAlboms(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getAlbomById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
