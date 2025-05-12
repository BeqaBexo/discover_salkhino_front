import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel, TranslateHotel } from './hotel-detail-service.model';

@Injectable({
  providedIn: 'root'
})
export class HotelDetailService {
  private baseUrl = 'https://localhost:7237/api';
  private hotelUrl = `${this.baseUrl}/Hotel`;
  private imageUrl = `${this.baseUrl}/Image`;
  private dictionaryUrl = `${this.baseUrl}/Dictionary`;

  constructor(private http: HttpClient) {}

  // ყველა სასტუმროს წამოღება
  getAllHotel(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.hotelUrl);
  }

  // ერთი კონკრეტული სასტუმრო ID-ით
  getHotelById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.hotelUrl}/${id}`);
  }

  // სასტუმროს დამატება
  addHotel(data: Hotel): Observable<number> {
    return this.http.post<number>(this.hotelUrl, data);
  }

  // სურათების ატვირთვა
  uploadImages(formData: FormData): Observable<any> {
    return this.http.post(`${this.imageUrl}/upload-multiple`, formData);
  }

  // თარგმანის წამოღება
  getTranslations(language: string): Observable<TranslateHotel> {
    return this.http.get<TranslateHotel>(`${this.dictionaryUrl}/${language}`);
  }
}
