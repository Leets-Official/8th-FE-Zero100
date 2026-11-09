import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api } from '../api/client';

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-400';

function InquiryCreate() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 내 정보로 이름·이메일 미리 채우기 (실패해도 직접 입력 가능)
  useEffect(() => {
    api
      .get('/api/auth/me')
      .then((res) => {
        const me = res.data.data;
        setName((prev) => prev || me.name);
        setEmail((prev) => prev || me.email);
      })
      .catch(() => {});
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !title.trim() || !content.trim()) {
      alert('모든 항목을 입력해 주세요.');
      return;
    }

    setIsLoading(true);

    try {
      await api.post('/api/inquiries', {
        title: title.trim(),
        name: name.trim(),
        email: email.trim(),
        content: content.trim(),
      });
      alert('문의가 등록되었습니다.');
      navigate('/inquiries');
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error
        : undefined;
      alert(message ?? '문의 등록에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-[680px]">
      <h1 className="mb-6 text-2xl font-bold">문의 등록</h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-gray-200 bg-white p-6"
      >
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">이름</label>
          <input
            required
            className={inputClass}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="이름을 입력하세요"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">이메일</label>
          <input
            required
            type="email"
            className={inputClass}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="이메일을 입력하세요"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">제목</label>
          <input
            required
            className={inputClass}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="제목을 입력하세요"
          />
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium">내용</label>
          <textarea
            required
            className={`${inputClass} min-h-40 resize-y`}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="내용을 입력하세요"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/inquiries')}
            className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-medium hover:bg-gray-50"
          >
            취소
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:bg-gray-400"
          >
            {isLoading ? '등록 중...' : '등록'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default InquiryCreate;
