import { AxiosError, CanceledError } from 'axios';
import { DemoApiError, readDatabase, writeDatabase, publicUser } from './database';
import { hashPassword, matchesPassword } from './password';
import {
  validateSignup,
  validateLogin,
  validateInquiry,
  validatePasswordChange,
  nameError,
  hasErrors,
} from '../utils/validation';

let requestQueue = Promise.resolve();
function validate(errors) {
  if (hasErrors(errors)) throw new DemoApiError('입력한 내용을 확인해 주세요.', 422, errors);
}
function delay(signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new CanceledError());
      return;
    }
    const onAbort = () => {
      clearTimeout(timer);
      signal?.removeEventListener('abort', onAbort);
      reject(new CanceledError());
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, 180);
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}
async function handleRequest(config) {
  const method = config.method.toUpperCase();
  const path = config.url;
  const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data || {};
  const db = await readDatabase();
  const commit = () => {
    if (config.signal?.aborted) throw new CanceledError();
    writeDatabase(db);
  };

  if (method === 'POST' && path === '/auth/signup') {
    validate(validateSignup(body));
    const email = body.email.trim().toLowerCase();
    if (db.accounts.some((a) => a.email === email))
      throw new DemoApiError('이미 가입된 이메일입니다.', 409, {
        email: '이미 가입된 이메일입니다.',
      });
    const account = {
      id: crypto.randomUUID(),
      name: body.name.trim(),
      email,
      credential: await hashPassword(body.password),
      createdAt: new Date().toISOString(),
    };
    db.accounts.push(account);
    commit();
    return publicUser(account);
  }
  if (method === 'POST' && path === '/auth/login') {
    validate(validateLogin(body));
    const account = db.accounts.find((a) => a.email === body.email.trim().toLowerCase());
    if (!account || !(await matchesPassword(body.password, account.credential)))
      throw new DemoApiError('이메일 또는 비밀번호가 올바르지 않습니다.', 400);
    const token = crypto.randomUUID();
    db.sessions[token] = account.id;
    commit();
    return { token, user: publicUser(account) };
  }
  const token = config.headers.get('Authorization')?.replace(/^Bearer /, '');
  const account = db.accounts.find((a) => a.id === db.sessions[token]);
  if (!account) throw new DemoApiError('로그인이 필요합니다. 다시 로그인해 주세요.', 401);

  if (method === 'GET' && path === '/me') return publicUser(account);
  if (method === 'POST' && path === '/auth/logout') {
    delete db.sessions[token];
    commit();
    return null;
  }
  if (method === 'PATCH' && path === '/me/name') {
    validate({ name: nameError(body.name) });
    account.name = body.name.trim();
    commit();
    return publicUser(account);
  }
  if (method === 'PATCH' && path === '/me/password') {
    validate(validatePasswordChange(body));
    if (!(await matchesPassword(body.currentPassword, account.credential)))
      throw new DemoApiError('현재 비밀번호가 올바르지 않습니다.', 422, {
        currentPassword: '현재 비밀번호가 올바르지 않습니다.',
      });
    account.credential = await hashPassword(body.newPassword);
    for (const [key, userId] of Object.entries(db.sessions))
      if (userId === account.id) delete db.sessions[key];
    commit();
    return null;
  }
  if (method === 'GET' && path === '/dashboard')
    return {
      user: publicUser(account),
      totalInquiries: db.inquiries.length,
      myInquiries: db.inquiries.filter((i) => i.userId === account.id).length,
    };
  if (method === 'GET' && path === '/inquiries')
    return [...db.inquiries].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  if (method === 'POST' && path === '/inquiries') {
    validate(validateInquiry(body));
    const inquiry = {
      id: crypto.randomUUID(),
      userId: account.id,
      name: body.name.trim(),
      email: body.email.trim(),
      title: body.title.trim(),
      content: body.content.trim(),
      createdAt: new Date().toISOString(),
    };
    db.inquiries.push(inquiry);
    commit();
    return inquiry;
  }
  const match = path.match(/^\/inquiries\/([^/]+)$/);
  if (match) {
    const inquiry = db.inquiries.find((i) => i.id === decodeURIComponent(match[1]));
    if (!inquiry)
      throw new DemoApiError('문의를 찾을 수 없습니다. 이미 삭제되었을 수 있습니다.', 404);
    if (method === 'GET') return inquiry;
    if (method === 'DELETE') {
      if (inquiry.userId !== account.id)
        throw new DemoApiError('직접 작성한 문의만 삭제할 수 있습니다.', 403);
      db.inquiries = db.inquiries.filter((i) => i.id !== inquiry.id);
      commit();
      return null;
    }
  }
  throw new DemoApiError('요청한 기능을 찾을 수 없습니다.', 404);
}

// 서버 명세가 없는 단계의 로컬 데모 전용 adapter입니다. 실제 서버 인증이 아닙니다.
export async function adminAdapter(config) {
  await delay(config.signal);
  const execute = async () => {
    if (config.signal?.aborted) throw new CanceledError();
    try {
      const data = await handleRequest(config);
      return { data, status: 200, statusText: 'OK', headers: {}, config };
    } catch (error) {
      if (error instanceof CanceledError) throw error;
      const response = {
        data: {
          message: error.message || '요청을 처리하지 못했습니다.',
          errors: error.errors || {},
        },
        status: error.status || 500,
        statusText: 'Error',
        headers: {},
        config,
      };
      throw new AxiosError(response.data.message, 'ERR_BAD_RESPONSE', config, null, response);
    }
  };
  const pending = requestQueue.then(execute, execute);
  requestQueue = pending.catch(() => {});
  return pending;
}
