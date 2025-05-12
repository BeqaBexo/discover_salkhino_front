import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maran } from './maran.model'; // თუ გაქვს მოდელი ცალკე გამოყვანილი


@Injectable({
  providedIn: 'root'
})
export class MaranService {

  private baseUrl: string = 'https://localhost:7237/api';
  private apiUrl = `${this.baseUrl}/Maran`;
  private imageUrl = `${this.baseUrl}/Image`;


  constructor(private http: HttpClient) {}

  getAllMarans(): Observable<Maran[]> {
    return this.http.get<Maran[]>(this.apiUrl);
  }

  getMaranById(id: number): Observable<Maran> {
    return this.http.get<Maran>(`${this.apiUrl}/${id}`);
  }

  addMaran(maran: Maran): Observable<number> {
    return this.http.post<number>(this.apiUrl, maran);
  }

  uploadImages(formData: FormData): Observable<any> {
  return this.http.post(`${this.imageUrl}/upload-multiple`, formData); 
}


}
