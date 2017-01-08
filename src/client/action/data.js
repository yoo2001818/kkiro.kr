import { createAction } from 'redux-actions';
import { metadata } from '../middleware/metadata';

export const LOAD = 'data/load';

export const load = createAction(LOAD, (...keys) => metadata(keys));
