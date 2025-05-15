import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class BannerSlideService {
  private apiUrl = `${environment.apiUrl}/api/BannerSlide`; 

  constructor(private http: HttpClient) {}

  addBannerSlide(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  getAllBannerSlides(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
