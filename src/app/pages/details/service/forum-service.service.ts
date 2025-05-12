import { HttpClient } from '@angular/common/http';
import { ForumComment, Forum } from './forum-service.model';
import { Observable } from 'rxjs';

import { inject, Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root',
})

export class ForumService {

  constructor(private myhttp: HttpClient) { }

  forumCommentUrl:string='https://localhost:7237/api/ForumComment';
  forumUrl:string='https://localhost:7237/api/Forum';
 


  // for getting Data
  listForumComment: ForumComment[] = [];
  listForum: Forum[] = [];


   
  // for post data / insert data
  forumCommentData: ForumComment = new ForumComment()
  forumData: Forum = new Forum()


  /////////////

    // Fetch all forums
    getAllForums(): Observable<Forum[]> {
      return this.myhttp.get<Forum[]>(this.forumUrl);
    }

  
    // Fetch all comments for a specific forum
    getForumComments(forumId: number): Observable<ForumComment[]> {
      return this.myhttp.get<ForumComment[]>(`${this.forumCommentUrl}?forumId=${forumId}`);
    }
  
    // Add a new forum
    addForum(forum: Forum): Observable<Forum> {
      return this.myhttp.post<Forum>(this.forumUrl, forum);
    }
  
    // Add a new comment
    addForumComment(comment: ForumComment): Observable<ForumComment> {
      return this.myhttp.post<ForumComment>(this.forumCommentUrl, comment);
    }
  
    // Delete a forum
    deleteForum(id: number): Observable<void> {
      return this.myhttp.delete<void>(`${this.forumUrl}/${id}`);
    }
  
    // Delete a comment
    deleteForumComment(id: number): Observable<void> {
      return this.myhttp.delete<void>(`${this.forumCommentUrl}/${id}`);
    }

}
