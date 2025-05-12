import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HistoryItem {
  id: number;
  title: string;
  narrator: string;
  avatarUrl: string;
  summary: string;
  fullText: string;
  updated: string;
}

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private apiUrl = 'https://localhost:7237/api/History';

  constructor(private http: HttpClient) {}

  getHistories(): Observable<HistoryItem[]> {
    return this.http.get<HistoryItem[]>(this.apiUrl);
  }
}
