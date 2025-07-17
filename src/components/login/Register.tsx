'use client';

import { useState } from 'react';
import Input from '../ui/Input';
import Link from 'next/link';
import Button from '../ui/Button';
import { useRouter } from 'next/navigation';
import { signupUser } from '@/libs/auth';
import PasswordInput from '../ui/PasswrodInput';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export default function Register() {
  const router = useRouter();

  // 유효성 검사 유틸 추가
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (pw: string) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/.test(pw);

  const { mutate: signupMutate, isPending } = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      alert('회원가입 성공!');
      router.push('/login');
    },
    onError: (error) => {
      const err = error as AxiosError<{ code?: string; message?: string }>;
      const code = err.response?.data?.code;
      const message = err.response?.data?.message;
      switch (code) {
        case '4092':
          console.log('이미 가입된 이메일입니다.');
          break;
        case '4091':
          console.log('중복된 닉네임입니다.');
          break;
        case '5000':
          console.log('서버 내부 오류입니다.');
          break;
        default:
          console.log(message || '회원가입 실패');
      }
    },
  });

  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    email: '',
    password: '',
  });

  const [agree, setAgree] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, nickname, email, password } = formData;

    if (!name || !nickname || !email || !password) {
      return alert('모든 항목을 입력해주세요.');
    }

    if (!validateEmail(email)) {
      return alert('올바른 이메일 형식을 입력해주세요.');
    }

    if (!validatePassword(password)) {
      return alert('비밀번호는 8~12자의 영문과 숫자를 포함해야 합니다.');
    }

    if (!agree) return alert('이용약관에 동의해주세요.');

    if (password !== confirmPassword)
      return alert('비밀번호가 일치하지 않습니다.');

    signupMutate({ name, nickname, email, password });
  };

  return (
    <div className="min-h-screen w-full px-6 flex flex-col justify-center">
      {/* 로고 */}
      <h1 className="text-6xl font-[vitro-core] text-[var(--primary-300)] mb-12 text-center">
        MAPICK
      </h1>

      {/* 회원가입 */}
      <form
        className="flex flex-col gap-6 w-full max-w-lg mx-auto"
        onSubmit={handleSubmit}
      >
        {/* 이름 */}
        <Input
          label="이름"
          type="text"
          placeholder="이름을 입력하세요"
          value={formData.name}
          onChange={handleChange}
          name="name"
        />

        {/* 닉네임 */}
        <Input
          label="닉네임"
          type="text"
          placeholder="닉네임을 입력하세요"
          value={formData.nickname}
          onChange={handleChange}
          name="nickname"
        />

        {/* 이메일 */}
        <Input
          label="이메일"
          type="email"
          placeholder="이메일을 입력하세요"
          value={formData.email}
          onChange={handleChange}
          name="email"
        />

        {/* 비밀번호 */}
        <div className="relative">
          <PasswordInput
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className="relative">
          <PasswordInput
            placeholder="비밀번호를 다시 입력하세요"
            value={confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
          />
        </div>

        {/* 이용약관 동의 */}
        <label className="text-sm text-[var(--black)] flex items-center gap-2">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
            className="accent-[#005C54] w-4 h-4"
            name="agree"
          />
          이용약관에 동의합니다.
        </label>

        {/* 회원가입 버튼 */}
        <Button
          buttonStyle="green"
          fullWidth
          className="h-[45px] py-2 rounded-lg text-sm"
          type="submit"
          disabled={isPending}
        >
          회원가입
        </Button>

        {/* 회원가입 안내 */}
        <p className="text-sm text-center text-[var(--black)]">
          이미 계정이 있으신가요?{' '}
          <Link
            href="/login"
            className="text-[var(--primary-300)] font-semibold cursor-pointer hover:underline"
          >
            로그인
          </Link>
        </p>
      </form>
    </div>
  );
}
