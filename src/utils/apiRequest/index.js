const success = data => Promise.resolve(data);

async function query(url, fetchParams, { patch, parser = 'json' }) {
  try {
    const res = await fetch(url, fetchParams);

    if ([200, 201, 304].includes(res.status)) {
      let data;
      try {
        data = await res[parser]();
      } catch (error) {
        data = {};
      }
      return success(data);
    } else if ([400, 409].includes(res.status)) {
      const err = await res[parser]();
      return Promise.reject(err);
    } else if (res.status === 204) {
      return success(res);
    } else if (res.status === 401) {
      return success('refreshToken');
    }
    throw Error('[API unhandled status]');
  } catch (err) {
    global.console.log(`${JSON.stringify(err)}`);
    throw err;
  }
}

async function makeApiCall({ parser = 'json', ...options }) {
  const fetchParams = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  };

  if (options.method) fetchParams.method = options.method;
  if (options.data) fetchParams.body = JSON.stringify(options.data);

  if (!options.url) {
    throw Error(`url can't be - ${options.url}`);
  }
  const data = await query(options.url, fetchParams, {
    patch: options.url,
    parser,
  });

  return data;
}

export default makeApiCall;
