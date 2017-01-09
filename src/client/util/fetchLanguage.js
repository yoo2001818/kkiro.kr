import getLanguage from './getLanguage';
import { load } from '../action/data';

export default function fetchLanguage(handler) {
  return (store, routerProps) => {
    return store.dispatch(load('site'))
    .then(() => {
      let language = getLanguage(routerProps.params, store.getState());
      handler(store, routerProps, language);
    });
  };
}
