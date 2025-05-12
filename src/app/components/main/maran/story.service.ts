import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StoryService {
  private apiUrl = 'https://localhost:7237/api/Story';

  constructor(private http: HttpClient) {}

  getAllStories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getStoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deleteStory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  addStory(data: any): Observable<number> {
    return this.http.post<number>(this.apiUrl, data);
  }
}
