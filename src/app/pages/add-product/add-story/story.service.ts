import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private baseUrl = 'https://localhost:7237/api';
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
