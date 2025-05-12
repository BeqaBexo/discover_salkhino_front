import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../add-product-service/add-service.model';


@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private baseUrl = 'https://localhost:7237/api';
  private hotelUrl = `${this.baseUrl}/Hotel`;
  private imageUrl = `${this.baseUrl}/Image`;

  constructor(private http: HttpClient) {}

  addHotel(data: Hotel): Observable<number> {
    return this.http.post<number>(this.hotelUrl, data);
  }

  uploadImages(formData: FormData): Observable<any> {
    return this.http.post(`${this.imageUrl}/upload-multiple`, formData);
  }
}
