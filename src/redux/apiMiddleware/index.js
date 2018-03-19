import { normalize } from 'normalizr';
import Q from 'q';

/**
 * make async calls
 * @param  {object} api Library for ajax requests
 * @param  {array} data Array of parameters whitch passes through makeApiCall
 * @return {Promise}    Server response result
 */
const callAll = api => (data = []) => Q().then(() => Q.all(data.map(url => api(url))));
/**
 * Check if it will be a single or multiple parallel requests
 * @param  {object} api     Library for ajax requests
 * @param  {cb} promise     Function for single request
 * @param  {cb} promiseAll  Function for parallel requests
 * @return {Promise}        Server response result
 */
const getPromise = (api, promise, promiseAll) =>
  (promiseAll ? promiseAll(callAll(api)) : promise(api));

const getNormalize = (data, schema, schemaOptions) =>
  (schemaOptions ? normalize(data, schema, schemaOptions) : normalize(data, schema));

const apiMiddleware = api => ({ dispatch, getState }) => next => (action) => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  const {
    types, promise, promiseAll, schema, schemaOptions, ...rest
  } = action;

  if (!promise && !promiseAll) {
    return next(action);
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const [REQUEST, SUCCESS, FAILURE] = types;

  next({ ...action, type: REQUEST });

  return getPromise(api, promise, promiseAll)
    .then(
      response =>
        next({
          ...rest,
          ...(schema
            ? {
              response,
              ...getNormalize(response, schema, schemaOptions),
            }
            : { result: response }),
          type: SUCCESS,
        }),
      error =>
        next({
          ...rest,
          error,
          type: FAILURE,
        }),
    )
    .catch((err) => {
      console.error('apiMiddleware', err); // eslint-disable-line no-console
      next({ type: FAILURE });
    });
};

export default apiMiddleware;
