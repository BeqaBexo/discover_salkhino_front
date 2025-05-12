import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbomService {
  private apiUrl = 'https://localhost:7237/api/Albom';

  constructor(private http: HttpClient) {}

  getAllAlboms(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getAlbomById(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${id}`);
}


}
