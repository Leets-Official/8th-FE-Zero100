import { apiClient } from './client';

function isUser(value) {
  return (
    value &&
    Number.isInteger(value.id) &&
    typeof value.name === 'string' &&
    typeof value.username === 'string' &&
    typeof value.email === 'string'
  );
}

function isPost(value) {
  return (
    value &&
    Number.isInteger(value.id) &&
    Number.isInteger(value.userId) &&
    typeof value.title === 'string' &&
    typeof value.body === 'string'
  );
}

async function getList(path, validate, signal) {
  const { data } = await apiClient.get(path, { signal });
  if (
    !Array.isArray(data) ||
    !data.every(validate) ||
    new Set(data.map((item) => item.id)).size !== data.length
  ) {
    throw new Error('Unexpected API response');
  }
  return data;
}

export function getUsers({ signal } = {}) {
  return getList('/users', isUser, signal);
}

export function getPosts({ signal } = {}) {
  return getList('/posts', isPost, signal);
}
