import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../models/blog';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  private apiUrl = 'http://localhost:8080/api/likes';

  constructor(private http: HttpClient) { }

  likeBlog(blogId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/like/blog/${blogId}`, null, { responseType: 'text' as 'json' });
  }

  unlikeBlog(blogId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/unlike/blog/${blogId}`, { responseType: 'text' as 'json' });
  }

  hasUserLikedBlog(userId: number, blogId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/blog/${blogId}/user/${userId}`);
  }

  getLikesCountByBlog(blogId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/blog/${blogId}/count`);
  }

  getBlogsLikedByUser(userId: number): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiUrl}/user/${userId}`);
  }

}
