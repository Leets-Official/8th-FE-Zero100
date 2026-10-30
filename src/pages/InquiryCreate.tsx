
import type { FormEvent } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type Inquiry = {
  id: number;
  title: string;
  category: string;
  status: string;
  date: string;
  content: string;
};

const initialInquiries: Inquiry[] = [
  {
    id: 1,
    title: '서비스 이용 방법이 궁금해요',
    category: '서비스 문의',
    status: '답변 대기',
    date: '2026.10.08',
    content: '서비스 이용 방법이 궁금합니다.',
  },
  {
    id: 2,
    title: '회원정보를 변경하고 싶어요',
    category: '계정 문의',
    status: '답변 완료',
    date: '2026.10.07',
    content: '회원정보 변경 방법이 궁금합니다.',
  },
  {
    id: 3,
    title: '로그인이 되지 않아요',
    category: '오류 문의',
    status: '답변 대기',
    date: '2026.10.06',
    content: '로그인 오류가 발생합니다.',
  },
];

export default function InquiryCreate() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('서비스 문의');
  const [content, setContent] = useState('');

  // 문의 등록 함수
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('제목과 문의 내용을 입력해 주세요.');
      return;
    }

    try {
      const saved = localStorage.getItem('inquiries');

      const inquiries: Inquiry[] = saved
        ? JSON.parse(saved) as Inquiry[]
        : initialInquiries;

      const newInquiry: Inquiry = {
        id: Date.now(),
        title: title.trim(),
        category,
        status: '답변 대기',
        date: new Date().toLocaleDateString('sv-SE').replaceAll('-', '.'),
        content: content.trim(),
      };

      localStorage.setItem(
        'inquiries',
        JSON.stringify([newInquiry, ...inquiries])
      );

      alert('문의가 등록되었습니다.');
      navigate('/inquiries');
    } catch {
      alert('문의 등록 중 오류가 발생했어요. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-3xl">

        {/* 페이지 제목 */}
        <header className="mb-8">
          <Link
            to="/inquiries"
            className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
          >
            ← 문의 목록
          </Link>

          <h1 className="text-3xl font-bold text-gray-900">
            문의 등록
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            궁금한 사항이나 불편한 점을 작성해 주세요.
          </p>
        </header>

        {/* 문의 작성 폼 */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8"
        >
          {/* 문의 제목 */}
          <div className="mb-6">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              문의 제목
            </label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="문의 제목을 입력해 주세요."
              maxLength={100}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
            />
          </div>

          {/* 문의 유형 */}
          <div className="mb-6">
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              문의 유형
            </label>

            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
            >
              <option value="서비스 문의">서비스 문의</option>
              <option value="계정 문의">계정 문의</option>
              <option value="오류 문의">오류 문의</option>
              <option value="기타 문의">기타 문의</option>
            </select>
          </div>

          {/* 문의 내용 */}
          <div className="mb-8">
            <label
              htmlFor="content"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              문의 내용
            </label>

            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="문의하실 내용을 자세하게 작성해 주세요."
              rows={8}
              maxLength={2000}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm leading-6 outline-none transition focus:border-black"
            />

            <p className="mt-2 text-right text-xs text-gray-400">
              {content.length} / 2000
            </p>
          </div>

          {/* 버튼 */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              to="/inquiries"
              className="rounded-lg border border-gray-300 px-6 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              취소
            </Link>

            <button
              type="submit"
              className="rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              문의 등록하기
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
