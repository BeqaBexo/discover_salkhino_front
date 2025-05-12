import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BannerSlideService {
  private apiUrl = 'https://localhost:7237/api/BannerSlide';

  constructor(private http: HttpClient) {}

  getAllBannerSlides(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addBannerSlide(data: any): Observable<number> {
    return this.http.post<number>(this.apiUrl, data);
  }

  deleteBannerSlide(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
