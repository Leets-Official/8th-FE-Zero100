// JSON.parse 결과처럼 구조를 알 수 없는 값이 일반 객체인지 확인
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
