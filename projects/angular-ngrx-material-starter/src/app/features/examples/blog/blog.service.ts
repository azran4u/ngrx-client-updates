import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Blog, ID } from './blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogs: Map<ID, Blog>;
  constructor() {
    this.blogs = new Map<ID, Blog>();
    this.blogs.set('blog1', {
      id: 'blog1',
      name: 'blog1',
      author: 'user1',
      posts: ['post1']
    });
  }

  getAllBlogs(): Observable<Blog[]> {
    return of(Array.from(this.blogs.values()));
  }
}
