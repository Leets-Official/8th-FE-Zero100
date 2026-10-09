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

export default function InquiryCreate() {
const navigate = useNavigate();

const [title, setTitle] = useState('');
const [category, setCategory] = useState('서비스 문의');
const [content, setContent] = useState('');

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
event.preventDefault();


if (!title.trim() || !content.trim()) {
  alert('제목과 문의 내용을 모두 입력해 주세요.');
  return;
}

let inquiries: Inquiry[] = [];

try {
  const saved = localStorage.getItem('inquiries');

  if (saved) {
    inquiries = JSON.parse(saved) as Inquiry[];
  } else {
    inquiries = [
      {
        id: 1,
        title: '서비스 이용 방법이 궁금해요',
        category: '서비스 문의',
        status: '답변 대기',
        date: '2026.10.08',
        content: '서비스 이용 방법을 알려 주세요.',
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
  }
} catch {
  alert('문의 목록을 불러오지 못했어요. 다시 시도해 주세요.');
  return;
}

const newInquiry: Inquiry = {
  id: Date.now(),
  title: title.trim(),
  category,
  status: '답변 대기',
  date: new Date().toLocaleDateString('sv-SE').replaceAll('-', '.'),
  content: content.trim(),
};

try {
  localStorage.setItem(
    'inquiries',
    JSON.stringify([newInquiry, ...inquiries]),
  );
} catch {
  alert('문의를 저장하지 못했어요. 다시 시도해 주세요.');
  return;
}

alert('문의가 등록되었어요!');
navigate('/inquiries');


};

const inputClass =
'w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black';

return ( <div className="min-h-screen bg-gray-50 p-6 md:p-10"> <div className="mx-auto max-w-3xl"> <header className="mb-8"> <h1 className="text-2xl font-bold text-gray-900">
문의 등록 </h1> <p className="mt-2 text-sm text-gray-500">
궁금한 점이나 불편한 사항을 작성해 주세요. </p> </header>


    <form
      onSubmit={handleSubmit}
      className="space-y-7 rounded-xl border border-gray-200 bg-white p-6 md:p-8"
    >
      <div>
        <label
          htmlFor="inquiry-title"
          className="mb-2 block text-sm font-semibold text-gray-800"
        >
          문의 제목 <span className="text-red-500">*</span>
        </label>
        <input
          id="inquiry-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="제목을 입력해 주세요."
          className={inputClass}
          required
        />
      </div>

      <div>
        <label
          htmlFor="inquiry-category"
          className="mb-2 block text-sm font-semibold text-gray-800"
        >
          문의 유형 <span className="text-red-500">*</span>
        </label>
        <select
          id="inquiry-category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className={inputClass}
        >
          <option>서비스 문의</option>
          <option>계정 문의</option>
          <option>오류 문의</option>
          <option>기타 문의</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="inquiry-content"
          className="mb-2 block text-sm font-semibold text-gray-800"
        >
          문의 내용 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="inquiry-content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="문의 내용을 자세히 입력해 주세요."
          rows={8}
          className={`${inputClass} resize-y leading-6`}
          required
        />
        <p className="mt-2 text-xs text-gray-400">
          문의 내용을 구체적으로 작성해 주시면 더 정확한 안내를 받을 수 있어요.
        </p>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
        <Link
          to="/inquiries"
          className="rounded-lg border border-gray-300 px-6 py-3 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          취소
        </Link>

        <button
          type="submit"
          className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          문의 등록
        </button>
      </div>
    </form>
  </div>
</div>

);
}
