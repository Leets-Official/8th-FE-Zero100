import client from './client';

export async function getInquiries() {
  const response = await client.get('/api/inquiries');
  return response.data.data;
}

export async function createInquiry({ title, name, email, content }) {
  const response = await client.post('/api/inquiries', { title, name, email, content });
  return response.data.data;
}

export async function deleteInquiry(id) {
  await client.delete(`/api/inquiries/${id}`);
}
