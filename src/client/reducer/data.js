import * as loadAction from '../action/load';
import deepmerge from 'deepmerge';

export default function data(state = null, action) {
  switch (action.type) {
  case loadAction.FETCH_COMPLETE:
    return deepmerge(state || {}, action.payload);
  }
  return state;
}
