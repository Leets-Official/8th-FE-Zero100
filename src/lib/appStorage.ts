export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  joinedAt: string;
};

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  title: string;
  content: string;
  date: string;
};

const USERS_KEY = 'zero100.users';
const SESSION_KEY = 'zero100.session';
const INQUIRIES_KEY = 'zero100.inquiries';

const initialInquiries: Inquiry[] = [
  {
    id: '1',
    name: '홍길동',
    email: 'hong@example.com',
    title: '서비스 이용 관련 문의드립니다',
    date: '2026년 3월 25일 17:11',
    content:
      '안녕하세요. 서비스 이용 중 몇 가지 궁금한 사항이 있어 문의드립니다.\n\n1. API 연동 시 인증 방법은 어떻게 되나요?\n2. 데이터 백업 주기는 어떻게 되나요?\n3. 사용자 권한 관리는 어떻게 설정하나요?\n\n자세한 답변 부탁드립니다. 감사합니다.',
  },
  {
    id: '2',
    name: '홍길동',
    email: 'hong@example.com',
    title: '결제 시스템에 대해 질문이 있습니다',
    date: '2026년 3월 24일 14:30',
    content: '결제 시스템 이용 방법에 대해 문의드립니다.',
  },
  {
    id: '3',
    name: '홍길동',
    email: 'hong@example.com',
    title: '회원가입이 되지 않습니다',
    date: '2026년 3월 23일 09:15',
    content: '회원가입 과정에서 오류가 발생합니다.',
  },
  {
    id: '4',
    name: '홍길동',
    email: 'hong@example.com',
    title: '대시보드 기능 개선 요청',
    date: '2026년 3월 22일 16:45',
    content: '대시보드 기능 개선을 요청드립니다.',
  },
  {
    id: '5',
    name: '홍길동',
    email: 'hong@example.com',
    title: 'API 연동 방법 문의',
    date: '2026년 3월 21일 11:20',
    content: 'API 연동 방법에 대해 안내 부탁드립니다.',
  },
];

function createId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function readArray<T>(key: string): T[] {
  try {
    const value = localStorage.getItem(key);
    if (!value) return [];

    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

export function getInquiries(): Inquiry[] {
  try {
    const saved = localStorage.getItem(INQUIRIES_KEY);

    if (saved !== null) {
      const parsed: unknown = JSON.parse(saved);
      return Array.isArray(parsed) ? (parsed as Inquiry[]) : [];
    }

    // 기존 코드에서 저장한 삭제 ID도 첫 실행 시 반영
    const deletedIds = readArray<string | number>('deletedInquiryIds').map(String);
    const initial = initialInquiries.filter(
      (inquiry) => !deletedIds.includes(inquiry.id),
    );

    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(initial));
    return initial;
  } catch {
    return initialInquiries;
  }
}

export function saveInquiries(inquiries: Inquiry[]) {
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
}

export function addInquiry(input: Omit<Inquiry, 'id'>) {
  const inquiry: Inquiry = { ...input, id: createId() };
  saveInquiries([inquiry, ...getInquiries()]);
  return inquiry;
}

export function deleteInquiry(id: string) {
  saveInquiries(getInquiries().filter((inquiry) => inquiry.id !== id));
}

export function getUsers(): User[] {
  return readArray<User>(USERS_KEY);
}

export function getCurrentUser(): User | null {
  try {
    const email = localStorage.getItem(SESSION_KEY);
    if (!email) return null;

    return (
      getUsers().find(
        (user) => user.email.toLowerCase() === email.toLowerCase(),
      ) ?? null
    );
  } catch {
    return null;
  }
}

export function registerUser(input: {
  name: string;
  email: string;
  password: string;
}) {
  const users = getUsers();
  const email = input.email.trim().toLowerCase();

  if (users.some((user) => user.email.toLowerCase() === email)) {
    throw new Error('이미 가입된 이메일입니다.');
  }

  const user: User = {
    id: createId(),
    name: input.name.trim(),
    email,
    password: input.password,
    joinedAt: new Date().toISOString(),
  };

  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
  localStorage.setItem(SESSION_KEY, email);
  return user;
}

export function loginUser(emailInput: string, password: string) {
  const email = emailInput.trim().toLowerCase();
  const user = getUsers().find(
    (item) =>
      item.email.toLowerCase() === email && item.password === password,
  );

  if (!user) {
    throw new Error('이메일 또는 비밀번호를 확인해 주세요.');
  }

  localStorage.setItem(SESSION_KEY, user.email);
  return user;
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}

export function updateCurrentUserName(name: string) {
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('로그인 정보가 없습니다.');

  const updatedUsers = getUsers().map((user) =>
    user.id === currentUser.id ? { ...user, name: name.trim() } : user,
  );

  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
}

export function updateCurrentUserPassword(
  currentPassword: string,
  newPassword: string,
) {
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('로그인 정보가 없습니다.');

  if (currentUser.password !== currentPassword) {
    throw new Error('현재 비밀번호가 올바르지 않습니다.');
  }

  const updatedUsers = getUsers().map((user) =>
    user.id === currentUser.id ? { ...user, password: newPassword } : user,
  );

  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
}
