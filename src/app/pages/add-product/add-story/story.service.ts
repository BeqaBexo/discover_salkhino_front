import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private baseUrl = `${environment.apiUrl}/api`; 
  private storyUrl = `${this.baseUrl}/Story`;
  private imageUrl = `${this.baseUrl}/Image`;

  constructor(private http: HttpClient) {}

  addStory(data: any): Observable<number> {
    return this.http.post<number>(this.storyUrl, data);
  }

  uploadImages(formData: FormData): Observable<any> {
    return this.http.post(`${this.imageUrl}/upload-multiple`, formData);
  }

  getAllStories(): Observable<any[]> {
    return this.http.get<any[]>(this.storyUrl);
  }
}
