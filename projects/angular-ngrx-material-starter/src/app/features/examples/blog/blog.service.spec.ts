import { TestBed } from '@angular/core/testing';

import { BlogService } from './blog.service';

fdescribe('BlogService', () => {
  let service: BlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit update asfter change', () => {
    const updates$ = service
      .subscribeToBlogChanges(['testblog1'])
      .subscribe(({ updated, deleted }) => {
        expect(updated.includes('testblog1'));
      }, fail);
    service.updateBlogs(
      [{ id: 'testblog1', name: 'testblog1', author: 'testuser1', posts: [] }],
      []
    );
    expect(service).toBeTruthy();
  });

  it('should not emit irrelevant update', () => {
    const updates$ = service
      .subscribeToBlogChanges(['testblog1', 'testblog3'])
      .subscribe(({ updated, deleted }) => {
        expect(updated.includes('testblog1'));
      }, fail);
    service.updateBlogs(
      [{ id: 'testblog2', name: 'testblog1', author: 'testuser1', posts: [] }],
      []
    );
    service.updateBlogs(
      [{ id: 'testblog1', name: 'testblog1', author: 'testuser1', posts: [] }],
      []
    );
    service.updateBlogs([], ['testblog3']);
  });
});
