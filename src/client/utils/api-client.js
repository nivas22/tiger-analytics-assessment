import axios from 'axios';

export default async function client(url, method, { body, ...customConfig } = {}) {
  const headers = {
    'Content-Type': 'application/json'
  };

  // Merge all the incoming config for request.
  const config = {
    method: method || 'GET',
    url,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  };
  if (body) {
    config.data = body;
  }

  // Do not catch error here, let it bubble up, handled by caller
  const { data } = await axios(config);
  return data;
}
