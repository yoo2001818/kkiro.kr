import * as loadAction from '../action/load';
import merge from 'lodash.merge';

export default function data(state = null, action) {
  switch (action.type) {
  case loadAction.FETCH_COMPLETE:
    return merge({}, state, action.payload);
  }
  return state;
}
