import api from './axios';

export async function signup({ email, password, name }) {
  const payload = {
    email: email.trim(),
    password,
  };

  if (name?.trim()) {
    payload.name = name.trim();
  }

  const response = await api.post('/api/auth/signup', payload);

  return response.data.data;
}

export async function login({ email, password }) {
  const response = await api.post('/api/auth/login', {
    email: email.trim(),
    password,
  });

  return response.data.data;
}

export async function getMe({ signal } = {}) {
  const response = await api.get('/api/auth/me', {
    signal,
  });

  return response.data.data;
}

export async function updateName(name) {
  const response = await api.patch('/api/auth/me', {
    name: name.trim(),
  });

  return response.data.data;
}

export async function updatePassword({ currentPassword, newPassword }) {
  const response = await api.patch('/api/auth/me/password', {
    currentPassword,
    newPassword,
  });

  return response.data.data;
}
