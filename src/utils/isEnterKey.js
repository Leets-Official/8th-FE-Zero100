// 한글 입력(IME) 조합 중에 누른 Enter는 무시해야 마지막 글자가 중복 입력되지 않는다.
export const isEnterKey = (event) => event.key === 'Enter' && !event.nativeEvent.isComposing;
