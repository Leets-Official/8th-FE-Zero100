export interface InquiryNavigationState {
  listLocation: string;
}

export function inquiryListLocation(state: unknown): string {
  if (typeof state !== 'object' || state === null || !('listLocation' in state))
    return '/inquiries';
  const path = state.listLocation;
  return typeof path === 'string' && /^\/inquiries(?:\?[^#]*)?$/.test(path) ? path : '/inquiries';
}
