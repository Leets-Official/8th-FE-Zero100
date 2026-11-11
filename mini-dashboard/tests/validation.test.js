import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isValidEmail,
  isValidKakaoId,
  isValidPassword,
  validateInquiryField,
} from '../src/utils/validation.js';

test('회원가입과 비밀번호 변경에 같은 비밀번호 조건을 적용한다', () => {
  assert.equal(isValidPassword('Test1234!'), true);
  for (const value of ['', 'Test1234', '1234567!', 'Ab1!', 'Test 1234!', null])
    assert.equal(isValidPassword(value), false);
});

test('카카오 ID의 빈 값과 잘못된 서버 응답을 거부한다', () => {
  for (const value of [
    undefined,
    null,
    '',
    '  ',
    'undefined',
    ' NULL ',
    'NaN',
    'abc',
    '0',
    '9223372036854775808',
    {},
  ])
    assert.equal(isValidKakaoId(value), false);
  assert.equal(isValidKakaoId('4813745811'), true);
  assert.equal(isValidKakaoId('9223372036854775807'), true);
});

test('문의 입력의 이름, 이메일, 제목과 내용을 따로 검사한다', () => {
  assert.notEqual(validateInquiryField('authorName', '가'), '');
  assert.equal(validateInquiryField('authorName', '홍길동'), '');
  assert.notEqual(validateInquiryField('title', '가'), '');
  assert.equal(validateInquiryField('title', '문의 제목'), '');
  assert.notEqual(validateInquiryField('authorEmail', 'bad@'), '');
  assert.equal(isValidEmail(' person@example.com '), true);
  assert.notEqual(validateInquiryField('content', '  '), '');
  assert.equal(validateInquiryField('content', '문의 내용'), '');
});
