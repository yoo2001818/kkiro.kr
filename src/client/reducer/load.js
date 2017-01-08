import * as loadAction from '../action/load';

export default function load(state = {
  // Why use object? Because hashmap is much faster to lookup.
  completed: {},
  // Why use array? Because it changes often and removing values from object
  // is expensive. Furthermore, it won't contain too many values.
  loading: []
}, action) {
  switch (action.type) {
  case loadAction.FETCH_PENDING:
    return Object.assign({}, state, {
      loading: state.loading.concat(action.meta.key)
    });
  case loadAction.FETCH_COMPLETE:
    return Object.assign({}, state, {
      complete: state.complete.concat(action.meta.key),
      loading: state.loading.filter(v => v !== action.meta.key)
    });
  case loadAction.FETCH_ERROR:
    return Object.assign({}, state, {
      loading: state.loading.filter(v => v !== action.meta.key)
    });
  default:
    return state;
  }
}
