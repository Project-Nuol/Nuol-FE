import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { AuthLayout } from './AuthLayout';
import { Button, Field, Input } from '../components/ui';

export function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError('모든 항목을 입력해주세요.');
      return;
    }
    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 해요.');
      return;
    }
    setLoading(true);
    try {
      await signup(name, email, password);
      navigate('/library', { replace: true });
    } catch {
      setError('회원가입에 실패했어요. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="취향 기록 시작하기"
      subtitle="본 웹툰을 남기면 추천이 시작됩니다."
      footer={
        <>
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className="font-medium text-brand-400 hover:text-brand-300">
            로그인
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        <Field label="이름">
          {(id) => (
            <Input
              id={id}
              autoComplete="name"
              placeholder="닉네임"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
        </Field>
        <Field label="이메일">
          {(id) => (
            <Input
              id={id}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
        </Field>
        <Field label="비밀번호" hint="6자 이상">
          {(id) => (
            <Input
              id={id}
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
        </Field>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <Button type="submit" fullWidth loading={loading} className="mt-2">
          계정 만들기
        </Button>
      </form>
    </AuthLayout>
  );
}
