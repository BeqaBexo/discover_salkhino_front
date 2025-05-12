// src/app/details/maran/service/maran.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaranService {
  private apiUrl = 'https://localhost:7237/api/Maran';

  constructor(private http: HttpClient) {}

  getAllMarans(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getMaranById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
