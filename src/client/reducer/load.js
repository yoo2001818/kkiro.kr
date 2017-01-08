import * as loadAction from '../action/load';

export default function load(state = {
  error: null,
  // Why use object? Because hashmap is much faster to lookup.
  completed: {},
  // Why use array? Because it changes often and removing values from object
  // is expensive. Furthermore, it won't contain too many values.
  loading: []
}, action) {
  switch (action.type) {
  case loadAction.FETCH_PENDING:
    return Object.assign({}, state, {
      // Unset error if loading queue is empty.
      error: state.loading.length === 0 ? null : state.error,
      loading: state.loading.concat(action.meta.key)
    });
  case loadAction.FETCH_COMPLETE:
    return Object.assign({}, state, {
      completed: Object.assign({[action.meta.key]: true}, state.completed),
      loading: state.loading.filter(v => v !== action.meta.key)
    });
  case loadAction.FETCH_ERROR:
    return Object.assign({}, state, {
      error: action.payload,
      loading: state.loading.filter(v => v !== action.meta.key)
    });
  default:
    return state;
  }
}
