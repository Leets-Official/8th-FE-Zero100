import { formatInquiryDate } from '../../utils/dashboard/date.js';
import {
  loadInquiries,
  loadLastInquiryId,
  saveInquiries,
  saveLastInquiryId,
} from '../../utils/dashboard/inquiryStorage.js';
import { MOCK_INQUIRIES } from './inquiries.js';


function issueInquiryId(inquiries) {
  const usedIds = [...MOCK_INQUIRIES, ...inquiries].map((inquiry) => inquiry.id);
  const id = Math.max(loadLastInquiryId(), ...usedIds) + 1;
  saveLastInquiryId(id);
  return id;
}

export async function fetchInquiries() {
  return loadInquiries();
}

export async function fetchInquiry(id) {
  return loadInquiries().find((inquiry) => String(inquiry.id) === String(id)) ?? null;
}

export async function createInquiry(inquiry) {
  const inquiries = loadInquiries();
  const newInquiry = {
    ...inquiry,
    id: issueInquiryId(inquiries),
    createdAt: formatInquiryDate(new Date()),
  };
  saveInquiries([...inquiries, newInquiry]);
  return newInquiry;
}

export async function deleteInquiry(id) {
  saveInquiries(loadInquiries().filter((inquiry) => inquiry.id !== id));
}
