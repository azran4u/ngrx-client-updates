import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import { LocalStorageService } from '../../../core/core.module';

import { State } from '../examples.state';
import * as blogAction from './blog.actions';
import { selectBlogState } from './blog.selectors';
import { BlogService } from './blog.service';
import { of } from 'rxjs';

export const BLOG_KEY = 'EXAMPLES.BLOG';

@Injectable()
export class BlogEffects {
  persistBlogs = createEffect(
    () =>
      this.actions$.pipe(
        ofType(blogAction.actionBlogFetchSuccess),
        tap(({ blogs }) => console.log(`fetched ${blogs.length} blogs`))
      ),
    { dispatch: false }
  );

  getAllBlogs = createEffect(() =>
    this.actions$.pipe(
      ofType(blogAction.actionBlogFetchAll),
      switchMap(() =>
        this.blogService.getAllBlogs().pipe(
          map((blogs) => blogAction.actionBlogFetchSuccess({ blogs })),
          catchError((error) =>
            of(blogAction.actionBlogFetchFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private localStorageService: LocalStorageService,
    private blogService: BlogService
  ) {}
}
