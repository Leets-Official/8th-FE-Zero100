export type InquiryStatus = 'pending' | 'answered';
export type InquirySearchField = 'all' | 'title' | 'content' | 'name';
export type InquirySort = 'newest' | 'oldest' | 'title';

export interface InquiryValues {
  name: string;
  email: string;
  title: string;
  content: string;
}

export interface Inquiry extends InquiryValues {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt?: string;
  status: InquiryStatus;
}

export interface InquiryQuery {
  query: string;
  field: InquirySearchField;
  sort: InquirySort;
  status: 'all' | InquiryStatus;
  mine: boolean;
  size: number;
  page: number;
}

export interface InquiryListResult {
  items: Inquiry[];
  total: number;
  totalPages: number;
  page: number;
  offset: number;
}

export type InquiryFilterUpdates = Partial<
  Record<'q' | 'field' | 'sort' | 'status' | 'mine' | 'size' | 'page', string | number>
>;

export interface ApiOptions {
  signal?: AbortSignal;
}
