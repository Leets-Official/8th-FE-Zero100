import type { MockInquiry, NewMockInquiry } from '../../types/inquiry.ts';
import { formatInquiryDate } from '../../utils/dashboard/date.ts';
import {
  loadInquiries,
  loadLastInquiryId,
  saveInquiries,
  saveLastInquiryId,
} from '../../utils/dashboard/inquiryStorage.ts';
import { MOCK_INQUIRIES } from './inquiries.ts';

function issueInquiryId(inquiries: MockInquiry[]): number {
  const usedIds = [...MOCK_INQUIRIES, ...inquiries].map((inquiry) => inquiry.id);
  const id = Math.max(loadLastInquiryId(), ...usedIds) + 1;
  saveLastInquiryId(id);
  return id;
}

export async function fetchInquiries(): Promise<MockInquiry[]> {
  return loadInquiries();
}

export async function fetchInquiry(id: number | string): Promise<MockInquiry | null> {
  return loadInquiries().find((inquiry) => String(inquiry.id) === String(id)) ?? null;
}

export async function createInquiry(inquiry: NewMockInquiry): Promise<MockInquiry> {
  const inquiries = loadInquiries();
  const newInquiry: MockInquiry = {
    ...inquiry,
    id: issueInquiryId(inquiries),
    createdAt: formatInquiryDate(new Date()),
  };
  saveInquiries([...inquiries, newInquiry]);
  return newInquiry;
}

export async function deleteInquiry(id: number): Promise<void> {
  saveInquiries(loadInquiries().filter((inquiry) => inquiry.id !== id));
}
