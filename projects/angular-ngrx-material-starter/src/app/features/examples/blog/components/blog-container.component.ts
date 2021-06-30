import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  ROUTE_ANIMATIONS_ELEMENTS,
  NotificationService
} from '../../../../core/core.module';

import * as blogActions from '../blog.actions';
import { Blog } from '../blog.model';
import * as blogSelectors from '../blog.selectors';

@Component({
  selector: 'anms-blog',
  templateUrl: './blog-container.component.html',
  styleUrls: ['./blog-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogContainerComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  blogs$: Observable<Blog[]>;

  constructor(
    public store: Store,
    public snackBar: MatSnackBar,
    public translateService: TranslateService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.store.dispatch(blogActions.actionBlogFetchAll());
    this.blogs$ = this.store.pipe(select(blogSelectors.selectAllBlogs));
  }
}
