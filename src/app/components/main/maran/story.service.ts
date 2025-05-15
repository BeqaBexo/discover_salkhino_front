import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StoryService {
  private apiUrl = `${environment.apiUrl}/api/Story`; 

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
