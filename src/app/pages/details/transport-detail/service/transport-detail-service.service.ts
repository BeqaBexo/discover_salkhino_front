import { Injectable } from '@angular/core';
import { Transport } from './transport-detail-service.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  transportUrl:string=`${environment.apiUrl}/api/Transport`; 
  
  listTransport: Transport[] = [];
     
  transportData: Transport = new Transport()
  
  constructor(
    private myhttp: HttpClient
  ) { }

  getAllTransport(): Observable<Transport[]> {
      return this.myhttp.get<Transport[]>(this.transportUrl);
    }

    getTransportById(id: number): Observable<Transport> {
      return this.myhttp.get<Transport>(`${this.transportUrl}/${id}`);
    }}
