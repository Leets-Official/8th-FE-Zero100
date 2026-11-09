import client from './client';

export async function getInquiries() {
  const response = await client.get('/api/inquiries');
  return response.data.data;
}
