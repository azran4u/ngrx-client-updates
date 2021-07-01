import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Blog, ID } from './blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogs: Map<ID, Blog>;
  private blogChanges: Subject<{ updated: ID[]; deleted: ID[] }>;

  constructor() {
    this.blogs = new Map<ID, Blog>();
    this.blogChanges = new Subject();
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

  getBlogsByIds(ids: ID[]): Observable<Blog[]> {
    return of(ids.map((id) => this.blogs.get(id)));
  }

  updateBlogs(updated: Blog[], deleted: ID[]) {
    updated.map((blog) => this.blogs.set(blog.id, blog));
    deleted.map((id) => this.blogs.delete(id));
    this.blogChanges.next({ updated: updated.map((blog) => blog.id), deleted });
  }

  subscribeToBlogChanges(
    ids: ID[]
  ): Observable<{ updated: ID[]; deleted: ID[] }> {
    return this.blogChanges.pipe(
      map(({ updated, deleted }) => {
        updated = updated.filter((update) => !ids.includes(update));
        deleted = deleted.filter((del) => !ids.includes(del));
        return { updated, deleted };
      }),
      filter(({ updated, deleted }) => updated.length > 0 || deleted.length > 0)
    );
  }
}
