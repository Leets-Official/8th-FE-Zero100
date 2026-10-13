export function parseInquiryQuery(params) {
  const size = Number(params.get('size'));
  const page = Number(params.get('page'));
  return {
    query: (params.get('q') || '').trim().slice(0, 100),
    field: ['all', 'title', 'content', 'name'].includes(params.get('field'))
      ? params.get('field')
      : 'all',
    sort: ['newest', 'oldest', 'title'].includes(params.get('sort'))
      ? params.get('sort')
      : 'newest',
    mine: params.get('mine') === 'true',
    size: [5, 10, 20].includes(size) ? size : 5,
    page: Number.isSafeInteger(page) && page > 0 ? page : 1,
  };
}

export function selectInquiries(inquiries, options, userId) {
  const keyword = options.query.toLocaleLowerCase('ko-KR');
  const fields = options.field === 'all' ? ['title', 'content', 'name'] : [options.field];
  const filtered = inquiries.filter(
    (inquiry) =>
      (!options.mine || inquiry.userId === userId) &&
      fields.some((field) => inquiry[field].toLocaleLowerCase('ko-KR').includes(keyword)),
  );
  filtered.sort((left, right) => {
    if (options.sort === 'title') return left.title.localeCompare(right.title, 'ko');
    const difference = Date.parse(right.createdAt) - Date.parse(left.createdAt);
    return options.sort === 'oldest' ? -difference : difference;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / options.size));
  const page = Math.min(options.page, totalPages);
  const offset = (page - 1) * options.size;
  return {
    items: filtered.slice(offset, offset + options.size),
    total: filtered.length,
    totalPages,
    page,
    offset,
  };
}

export function inquiryListLocation(state) {
  const path = state?.listLocation;
  return typeof path === 'string' && /^\/inquiries(?:\?[^#]*)?$/.test(path) ? path : '/inquiries';
}
