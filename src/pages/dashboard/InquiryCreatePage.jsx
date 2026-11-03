import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import Button from '../../components/dashboard/Button/Button';
import ButtonLink from '../../components/dashboard/ButtonLink/ButtonLink';
import PageHeading from '../../components/dashboard/PageHeading/PageHeading';
import TextArea from '../../components/dashboard/TextArea/TextArea';
import TextInput from '../../components/dashboard/TextInput/TextInput';
import { getInquiryDetailPath, ROUTES } from '../../constants/routes';
import { useInquiries } from '../../hooks/useInquiries';
import { isEmail } from '../../utils/isEmail';

const INITIAL_VALUES = { name: '', email: '', title: '', content: '' };

/** 칸마다 값이 올바르면 빈 문자열, 틀리면 에러 문구를 돌려준다. 모두 앞뒤 공백을 빼고 검사한다. */
const VALIDATORS = {
  name: (value) => (value.trim() ? '' : '이름을 입력하세요'),
  email: (value) => {
    if (!value.trim()) return '이메일을 입력하세요';
    return isEmail(value.trim()) ? '' : '올바른 이메일 형식을 입력하세요';
  },
  title: (value) => (value.trim() ? '' : '제목을 입력하세요'),
  content: (value) => (value.trim() ? '' : '내용을 입력하세요'),
};

function InquiryCreatePage() {
  const navigate = useNavigate();
  const { showToast } = useOutletContext();
  const { addInquiry } = useInquiries();
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState(INITIAL_VALUES);

  // 네 칸 모두 input의 name으로 어떤 값인지 구분해서 같은 핸들러를 쓴다. (회원가입 페이지와 같은 방식)
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  // 아직 아무것도 입력하지 않은 칸은 벗어나도 에러를 띄우지 않는다.
  const handleBlur = (event) => {
    const { name, value } = event.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: value ? VALIDATORS[name](value) : '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = Object.fromEntries(
      Object.entries(values).map(([name, value]) => [name, VALIDATORS[name](value)]),
    );
    setErrors(nextErrors);

    // 틀린 칸이 있으면 첫 번째 칸으로 포커스를 옮겨서 어디를 고쳐야 하는지 바로 알 수 있게 한다.
    const firstInvalidName = Object.keys(nextErrors).find((name) => nextErrors[name]);
    if (firstInvalidName) {
      event.currentTarget.elements.namedItem(firstInvalidName)?.focus();
      return;
    }

    const newInquiry = addInquiry({
      name: values.name.trim(),
      email: values.email.trim(),
      title: values.title.trim(),
      content: values.content.trim(),
    });
    showToast('문의가 등록되었습니다.');
    navigate(getInquiryDetailPath(newInquiry.id));
  };

  return (
    <div className="mx-auto flex w-full max-w-[672px] flex-col gap-6">
      <PageHeading title="문의 등록" />

      <form
        className="flex flex-col gap-4 rounded-[10px] border border-dash-line bg-white p-6"
        onSubmit={handleSubmit}
        noValidate
      >
        <TextInput
          name="name"
          label="이름"
          placeholder="이름을 입력하세요"
          autoComplete="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
        />
        <TextInput
          type="email"
          name="email"
          label="이메일"
          placeholder="이메일을 입력하세요"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
        />
        <TextInput
          name="title"
          label="제목"
          placeholder="제목을 입력하세요"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.title}
        />
        <TextArea
          name="content"
          label="내용"
          placeholder="내용을 입력하세요"
          // Figma 시안처럼 높이를 고정하고, 비어 있을 때는 안내 문구를 세로 가운데에 둔다.
          className="h-[164px] [&:placeholder-shown:not(:focus)]:pt-[69px]"
          value={values.content}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.content}
        />

        <div className="mt-2 flex justify-end gap-3">
          <ButtonLink variant="secondary" to={ROUTES.DASHBOARD_INQUIRIES}>
            취소
          </ButtonLink>
          <Button type="submit">등록</Button>
        </div>
      </form>
    </div>
  );
}

export default InquiryCreatePage;
