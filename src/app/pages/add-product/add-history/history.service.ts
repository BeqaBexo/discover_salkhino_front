import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private baseUrl = 'https://localhost:7237/api';
  private historyUrl = `${this.baseUrl}/history`;

  constructor(private http: HttpClient) {}

  addHistory(formData: FormData): Observable<any> {
    return this.http.post(`${this.historyUrl}/add`, formData);
  }

  getHistories(): Observable<any[]> {
    return this.http.get<any[]>(this.historyUrl);
  }
}
