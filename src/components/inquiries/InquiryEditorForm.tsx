import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useInquiryForm } from '../../hooks/useInquiryForm';
import type { InquiryValues } from '../../types/inquiry';
import type { InquiryNavigationState } from '../../utils/inquiryNavigation';
import TextField from '../common/TextField';
import Button from '../common/ButtonView';
import ConfirmationDialog from '../common/ConfirmationDialog';
import '../../styles/inquiry-editor.css';

interface InquiryEditorFormProps {
  initialValues: InquiryValues;
  onSave: (values: InquiryValues) => Promise<void>;
  cancelTo: string;
  navigationState?: InquiryNavigationState;
  submitLabel?: string;
}

export default function InquiryEditorForm({
  initialValues,
  onSave,
  cancelTo,
  navigationState,
  submitLabel = '등록',
}: InquiryEditorFormProps) {
  const form = useInquiryForm(initialValues);
  const navigate = useNavigate();
  const [cancelOpen, setCancelOpen] = useState(false);
  useEffect(() => {
    if (!form.isDirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [form.isDirty]);
  const leave = () => navigate(cancelTo, { state: navigationState });
  return (
    <>
      <form
        className="admin-card inquiry-form inquiry-editor-form"
        noValidate
        aria-busy={form.isSubmitting}
        onSubmit={form.handleSubmit(onSave)}
      >
        <fieldset disabled={form.isSubmitting}>
          <TextField
            {...form.field('name')}
            label="이름"
            placeholder="이름을 입력하세요"
            autoComplete="name"
            maxLength={16}
            required
          />
          <TextField
            {...form.field('email')}
            label="이메일"
            type="email"
            placeholder="이메일을 입력하세요"
            autoComplete="email"
            maxLength={254}
            required
          />
          <TextField
            {...form.field('title')}
            label="제목"
            placeholder="제목을 입력하세요"
            maxLength={100}
            counter={`${form.values.title.length}/100자`}
            required
          />
          <TextField
            {...form.field('content')}
            label="내용"
            placeholder="내용을 입력하세요"
            multiline
            rows={7}
            maxLength={5000}
            counter={`${form.values.content.length}/5,000자`}
            required
          />
          {form.formError && (
            <p className="form-error" role="alert">
              {form.formError}
            </p>
          )}
          <div className="form-actions">
            <Button
              variant="secondary"
              onClick={() => {
                if (form.isDirty) setCancelOpen(true);
                else leave();
              }}
            >
              취소
            </Button>
            <Button type="submit">
              {form.isSubmitting ? `${submitLabel} 중...` : submitLabel}
            </Button>
          </div>
        </fieldset>
      </form>
      <ConfirmationDialog
        open={cancelOpen}
        message="작성 중인 내용을 취소하시겠습니까?"
        confirmLabel="작성 취소"
        onClose={() => setCancelOpen(false)}
        onConfirm={leave}
      />
    </>
  );
}
