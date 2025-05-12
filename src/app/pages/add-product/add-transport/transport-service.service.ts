import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transport, TransportDetail, Image, TranslateTransp } from '../add-product-service/add-service.model';


@Injectable({
  providedIn: 'root'
})
export class TransportService {

  private baseUrl: string = 'https://localhost:7237/api';

  private transportUrl: string = `${this.baseUrl}/Transport`;
  private transportDetailUrl: string = `${this.baseUrl}/TransportDetail`;
  private imageUrl: string = `${this.baseUrl}/Image`;
  private dictionaryUrl: string = `${this.baseUrl}/Dictionary`;
  



  constructor(private myhttp: HttpClient) {}

  getTranslations(language: string): Observable<TranslateTransp> {
    const url = `${this.dictionaryUrl}/${language}`;
    return this.myhttp.get<TranslateTransp>(url);
  }

  // Get all Transports
  getTransports(): Observable<Transport[]> {
    return this.myhttp.get<Transport[]>(this.transportUrl);
  }

  // Get a single Transport by ID
  getTransportById(id: number): Observable<Transport> {
    const url = `${this.transportUrl}/${id}`;
    return this.myhttp.get<Transport>(url);
  }

  // Create a new Transport
  addTransport(transport: Transport): Observable<any> {
    return this.myhttp.post<Transport>(this.transportUrl, transport);
  }


  // Delete a Transport
  deleteTransport(id: number): Observable<void> {
    const url = `${this.transportUrl}/${id}`;
    return this.myhttp.delete<void>(url);
  }

  ////////////////////////////////////
  // Get all Transport Details
  getTransportDetails(): Observable<TransportDetail[]> {
    return this.myhttp.get<TransportDetail[]>(this.transportDetailUrl);
  }

  // Get a single TransportDetail by ID
  getTransportDetailById(id: number): Observable<TransportDetail> {
    const url = `${this.transportDetailUrl}/${id}`;
    return this.myhttp.get<TransportDetail>(url);
  }

  // Create a new TransportDetail
  createTransportDetail(detail: TransportDetail): Observable<TransportDetail> {
    return this.myhttp.post<TransportDetail>(this.transportDetailUrl, detail);
  }

  // Update an existing TransportDetail
  updateTransportDetail(detail: TransportDetail): Observable<TransportDetail> {
    const url = `${this.transportDetailUrl}/${detail.Id}`;
    return this.myhttp.put<TransportDetail>(url, detail);
  }

  // Delete a TransportDetail
  deleteTransportDetail(id: number): Observable<void> {
    const url = `${this.transportDetailUrl}/${id}`;
    return this.myhttp.delete<void>(url);
  }

  //////////////////////////////
  // Get all Images
  getImages(): Observable<Image[]> {
    return this.myhttp.get<Image[]>(this.imageUrl);
  }

  // Get a single Image by ID
  getImageById(id: number): Observable<Image> {
    const url = `${this.imageUrl}/${id}`;
    return this.myhttp.get<Image>(url);
  }

  // Create a new Image
  addImage(image: Image): Observable<Image> {
    return this.myhttp.post<Image>(this.imageUrl, image);
  }

  uploadImage(file: File, productTypeId: number, objectKey: number): Observable<Image> {
    const formData = new FormData();
    console.log('Insert objectKey:  ', objectKey)
    formData.append('file', file); 
    formData.append('productTypeId', productTypeId.toString());
    formData.append('objectKey', objectKey.toString());

    return this.myhttp.post<Image>(`${this.imageUrl}/upload`, formData);
  }

  updateTransport(transport: Transport): Observable<Transport> {
  const url = `${this.transportUrl}/${transport.id}`;
  return this.myhttp.put<Transport>(url, transport);
}


  // Update an existing Image
  updateImage(image: Image): Observable<Image> {
    const url = `${this.imageUrl}/${image.id}`;
    return this.myhttp.put<Image>(url, image);
  }

  // Delete an Image
  deleteImage(id: number): Observable<void> {
    const url = `${this.imageUrl}/${id}`;
    return this.myhttp.delete<void>(url);
  }

  uploadMultipleImages(formData: FormData): Observable<any> {
    return this.myhttp.post(`${this.imageUrl}/upload-multiple`, formData);
  }
  
  
  



}