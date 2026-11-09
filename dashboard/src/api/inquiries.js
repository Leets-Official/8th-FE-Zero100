import client from './client';

export const getInquiries = async () => {
  const response = await client.get('/api/inquiries');
  return response.data.data;
};

export const createInquiry = async (body) => {
  const response = await client.post('/api/inquiries', body);
  return response.data.data;
};

export const deleteInquiry = async (id) => {
  const response = await client.delete(`/api/inquiries/${id}`);
  return response.data.data;
};
