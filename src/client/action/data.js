import { createAction } from 'redux-actions';
import schema from '../../schema';

export const FETCH_COMPLETE = 'data/fetchComplete';

export const fetchComplete = createAction(FETCH_COMPLETE);

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
          let args = keys.slice(0, i + 1);
          return fetch('/metadata/' + resId + '.json')
          .then(res => {
            if (res.status == 200) return res.json();
            else if (res.status === 404) return false;
          })
          .then(body => {
            // Reconstruct structure
            let rootObj = {};
            args.reduce((prev, current, i) => {
              let newObj = prev[current] = i >= args.length - 1 ? body : {};
              return newObj;
            }, rootObj);
            return dispatch(fetchComplete(rootObj));
          });
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
