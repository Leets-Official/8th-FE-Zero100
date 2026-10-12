/** 조건에 따라 붙일 className들을 공백으로 이어 붙인다. false/undefined 같은 값은 건너뛴다. */
export const cn = (...classNames) => classNames.filter(Boolean).join(' ');
