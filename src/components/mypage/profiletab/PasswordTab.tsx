'use client';
import PasswordInput from '@/components/ui/PasswrodInput';
import { useProfileEditStore } from '@/store/profileeditStore';

export default function PasswordTab() {
  const {
    newPassword,
    setNewPassword,
    currentPassword,
    setCurrentPassword,
    confirmPassword,
    setConfirmPassword,
  } = useProfileEditStore();

  return (
    <div className="mt-7">
      <div className="flex justify-center">
        <p className="w-[170px] text-3xl text-[var(--primary-300)] mb-14 font-bold border-b-2 border-[var(--primary-300)]">
          비밀번호 변경
        </p>
      </div>
      <div className="h-full flex justify-center items-center">
        <div className="w-[350px] flex flex-col gap-6">
          <PasswordInput
            label="현재 비밀번호"
            placeholder="비밀번호를 입력하세요"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <PasswordInput
            label="새 비밀번호"
            placeholder="새 비밀번호를 입력하세요"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <PasswordInput
            label="새 비밀번호 확인"
            placeholder="새 비밀번호를 다시 입력하세요"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
