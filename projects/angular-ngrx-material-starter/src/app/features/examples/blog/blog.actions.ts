import { createAction, props } from '@ngrx/store';
import { Blog, ID } from './blog.model';

export const actionBlogFetchAll = createAction('[Blog] Fetch All');

export const actionBlogSelected = createAction(
  '[Blog] Selected',
  props<{ id: ID }>()
);

export const actionBlogFetchById = createAction(
  '[Blog] Fetch By Id',
  props<{ id: ID }>()
);

export const actionBlogFetchSuccess = createAction(
  '[Blog] Fetch Success',
  props<{ blogs: Blog[] }>()
);

export const actionBlogFetchFailure = createAction(
  '[Blog] Fetch Failure',
  props<{ error: Error }>()
);

export const actionBlogSubscribeById = createAction(
  '[Blog] Subscribe By Id',
  props<{ id: ID }>()
);

export const actionBlogSubscriptionFailure = createAction(
  '[Blog] Subscription Failure',
  props<{ error: Error }>()
);

export const actionBlogUpdated = createAction(
  '[Blog] Updated',
  props<{ updated: ID[]; deleted: ID[] }>()
);

export const actionBlogRemoveById = createAction(
  '[Blog] Remove',
  props<{ ids: ID[] }>()
);
