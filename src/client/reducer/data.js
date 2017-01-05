import * as dataAction from '../action/data';
import merge from 'lodash.merge';

export default function data(state = null, action) {
  switch (action.type) {
  case dataAction.FETCH_COMPLETE:
    return merge({}, state, action.payload);
  }
  return state;
}
