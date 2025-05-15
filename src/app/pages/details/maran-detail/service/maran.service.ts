// src/app/details/maran/service/maran.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaranService {
  private apiUrl = `${environment.apiUrl}/api/Maran`; 

  constructor(private http: HttpClient) {}

  getAllMarans(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getMaranById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
