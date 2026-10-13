function toHex(bytes) {
  return [...bytes].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}
export async function hashPassword(
  password,
  salt = toHex(crypto.getRandomValues(new Uint8Array(16))),
) {
  if (!crypto.subtle)
    throw new Error('암호 처리를 사용할 수 없습니다. localhost 또는 HTTPS로 실행해 주세요.');
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  );
  const result = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: new TextEncoder().encode(salt), iterations: 100000, hash: 'SHA-256' },
    key,
    256,
  );
  return { salt, hash: toHex(new Uint8Array(result)) };
}
export async function matchesPassword(password, credential) {
  return (await hashPassword(password, credential.salt)).hash === credential.hash;
}
