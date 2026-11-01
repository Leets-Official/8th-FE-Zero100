export { parseInquiryQuery, selectInquiries } from './inquiryQuery';

export function inquiryListLocation(state) {
  const path = state?.listLocation;
  return typeof path === 'string' && /^\/inquiries(?:\?[^#]*)?$/.test(path) ? path : '/inquiries';
}
