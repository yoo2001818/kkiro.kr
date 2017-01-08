import { createAction } from 'redux-actions';

export const FETCH_PENDING = 'load/fetchPending';
export const FETCH_COMPLETE = 'load/fetchComplete';
export const FETCH_ERROR = 'load/fetchError';

export const fetchPending = createAction(FETCH_PENDING,
  data => data, (_, key) => ({ key }));
export const fetchComplete = createAction(FETCH_COMPLETE,
  data => data, (_, key) => ({ key }));
export const fetchError = createAction(FETCH_ERROR,
  data => data, (_, key) => ({ key }));
