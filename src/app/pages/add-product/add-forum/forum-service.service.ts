import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Forum, ForumComment, Image } from '../add-product-service/add-service.model';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private forumUrl: string = `${environment.apiUrl}/api/Forum`; 
  private forumCommenlUrl: string = `${environment.apiUrl}/api/ForumComment`; 
  private imageUrl: string = `${environment.apiUrl}/api/Image`; 


  constructor(private myhttp: HttpClient) {}

  // Get all Transports
  getForums(): Observable<Forum[]> {
    return this.myhttp.get<Forum[]>(this.forumUrl);
  }

  // Get a single Transport by ID
  getForumId(id: number): Observable<Forum> {
    const url = `${this.forumUrl}/${id}`;
    return this.myhttp.get<Forum>(url);
  }

  // Create a new Transport
  createForum(forum: Forum): Observable<Forum> {
    return this.myhttp.post<Forum>(this.forumUrl, forum);
  }

  

  ////////////////////////////////////
  // Get all Transport Details
  getForumComment(): Observable<ForumComment[]> {
    return this.myhttp.get<ForumComment[]>(this.forumCommenlUrl);
  }

  // Get a single TransportDetail by ID
  getForumCommentById(id: number): Observable<ForumComment> {
    const url = `${this.forumCommenlUrl}/${id}`;
    return this.myhttp.get<ForumComment>(url);
  }

  // Create a new TransportDetail
  createForumComment(comment: ForumComment): Observable<ForumComment> {
    return this.myhttp.post<ForumComment>(this.forumCommenlUrl, comment);
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
  createImage(image: Image): Observable<Image> {
    return this.myhttp.post<Image>(this.imageUrl, image);
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

}