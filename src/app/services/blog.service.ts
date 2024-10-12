import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private apiUrl = 'http://localhost:8080/api/blogs';

  constructor(private http: HttpClient) { }

  getAllBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiUrl}/all`);
  }

  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }

  getBlogsByUserId(userId: number): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiUrl}/user/${userId}`);
  }

  getBlogsByCategoryId(categoryId: number): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiUrl}/category/${categoryId}`);
  }

  getBlogsByTitle(title: string): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiUrl}/title/${title}`);
  }

  getBlogsByCategoryName(categoryName: string): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiUrl}/categoryName/${categoryName}`);
  }

  createBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(`${this.apiUrl}/create`, blog);
  }

  updateBlog(blog: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${this.apiUrl}/${blog.id}/update`, blog);
  }

  deleteBlog(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}/delete`);
  }

}
