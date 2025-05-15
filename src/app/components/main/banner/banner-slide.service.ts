import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BannerSlideService {
  private apiUrl = `${environment.apiUrl}/api/BannerSlide`; 

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
