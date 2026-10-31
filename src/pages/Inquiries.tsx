return (
  <div className="min-h-screen bg-gray-50 p-6 md:p-10">
    <div className="mx-auto max-w-2xl bg-white p-8 rounded-xl border border-gray-200">

      <h1 className="text-2xl font-bold mb-6">
        문의 등록
      </h1>

      {/* 돌아가기 버튼 */}
      <button
        type="button"
        onClick={() => navigate('/inquiries')}
        className="mb-4 text-sm text-gray-600 hover:text-black"
      >
        ← 문의 목록으로 돌아가기
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* 문의 유형 */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            문의 유형
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 rounded-lg"
          >
            <option value="서비스 문의">서비스 문의</option>
            <option value="계정 문의">계정 문의</option>
            <option value="오류 문의">오류 문의</option>
          </select>
        </div>

        {/* 제목 */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            제목
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* 내용 */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            내용
          </label>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            rows={5}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* 등록 버튼 */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          등록하기
        </button>

      </form>
    </div>
  </div>
);