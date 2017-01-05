import { createAction } from 'redux-actions';
import schema from '../../schema';

export const FETCH = 'data/fetch';

export const fetch = createAction(FETCH);

export function load(...keys) {
  return (dispatch, getState) => {
    let state = getState();
    // Navigate to the keys
    let data = state.data;
    let subSchema = schema;
    function fetchResource(i) {
      if (data == null) {
        if (subSchema._self === false) {
          data = {};
        } else {
          // Load current resource
          let resId = subSchema._self || subSchema;
          if (typeof resId === 'function') {
            let args = keys.slice(0, i + 1);
            args.reverse();
            resId = resId.apply(null, args);
          }
          if (typeof resId !== 'string') {
            throw new Error('Resource ID must be string');
          }
          console.log('Fetch!', resId);
          // TODO fetch
        }
      }
    }
    for (let i = 0; i < keys.length; ++i) {
      let value;
      if ((value = fetchResource(i)) != null) return value;
      let key = keys[i];
      data = data[key];
      if (subSchema[key] != null) {
        subSchema = subSchema[key];
      } else if (subSchema._each != null) {
        subSchema = subSchema._each;
      } else {
        throw new Error('subSchema is not defined - tried to get ' + key);
      }
    }
    let value;
    if ((value = fetchResource(keys.length - 1)) != null) return value;
    return state;
  };
}
