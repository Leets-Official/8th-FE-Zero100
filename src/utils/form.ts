// 필드별 오류 메시지(오류가 없으면 빈 문자열) 중 첫 번째 오류 입력 필드로 포커스를 이동한다.
// 오류가 있으면 true를 반환하므로 제출을 중단할 때 사용한다. 키는 입력 필드의 name과 같아야 한다.
export function focusFirstInvalidField(
  form: HTMLFormElement,
  errors: Record<string, string>,
): boolean {
  const firstInvalidField = Object.entries(errors).find(([, error]) => error)?.[0];
  if (!firstInvalidField) return false;

  const field = form.elements.namedItem(firstInvalidField);
  if (field instanceof HTMLElement) field.focus();
  return true;
}
