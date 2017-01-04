import { createAction } from 'redux-action';

export const FETCH = 'data/fetch';

export const fetch = createAction(FETCH);

export function load() {
  // Noop for now
  return (dispatch, getState) => {
    let state = getState();
    return state;
  };
}
