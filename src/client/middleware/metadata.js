import schema from '../../schema';
import { fetchPending, fetchComplete, fetchError } from '../action/load';

export const METADATA = Symbol('metadataRequest');

export function metadata(keys) {
  return {
    [METADATA]: true,
    keys
  };
}

export const metadataMiddleware = client => store => next => action => {
  if (action == null) return next(action);
  if (action.payload == null) return next(action);
  if (!action.payload[METADATA]) return next(action);
  const { keys } = action.payload;
  let state = store.getState();
  let { completed, loading } = state.load;
  let subSchema = schema;
  let output = [];
  function fetchResource(i) {
    // Load current resource
    let resId = subSchema._self != null ? subSchema._self : subSchema;
    if (typeof resId === 'function') {
      let args = keys.slice(0, i + 1);
      args.reverse();
      resId = resId.apply(null, args);
    }
    if (resId === false) return;
    if (typeof resId !== 'string') {
      throw new Error('Resource ID must be string');
    }
    if (completed[resId] !== true && loading.indexOf(resId) === -1) {
      let args = keys.slice(0, i + 1);
      store.dispatch(fetchPending(null, resId));
      output.push(client(resId)
      .then(body => {
        // Reconstruct structure
        let rootObj = {};
        args.reduce((prev, current, i) => {
          let newObj = prev[current] = i >= args.length - 1 ? body : {};
          return newObj;
        }, rootObj);
        store.dispatch(fetchComplete(rootObj, resId));
        return store.dispatch(Object.assign({}, action, {
          payload: rootObj
        }));
      }, error => {
        return store.dispatch(fetchError(error, resId));
      }));
    }
  }
  for (let i = 0; i < keys.length; ++i) {
    fetchResource(i);
    let key = keys[i];
    if (subSchema[key] != null) {
      subSchema = subSchema[key];
    } else if (subSchema._each != null) {
      subSchema = subSchema._each;
    } else {
      throw new Error('subSchema is not defined - tried to get ' + key);
    }
  }
  fetchResource(keys.length - 1);
  if (output.length > 0) return Promise.all(output);
  return state;
};

export default metadataMiddleware;
