'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import Button from '../ui/Button';
import ProfileTab from './profiletab/ProfileTab';
import InterestTab from './profiletab/InterestTab';
import AchievementTab from './profiletab/AchievementTab';
import PasswordTab from './profiletab/PasswordTab';
import { useProfileStore } from '@/store/profileStore';
import { useProfileEditStore } from '@/store/profileeditStore';

const TABS = ['프로필', '비밀번호', '관심 분야', '업적'];

export default function ProfileEditModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('프로필');
  const [isSaving, setIsSaving] = useState(false);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleWithdraw = async () => {
    const confirmed = window.confirm('정말로 회원탈퇴 하시겠습니까?');
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_BASE_URL}members/withdraw`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          // 나중에 토큰 필요 시 추가
          // Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error('회원탈퇴 실패');
      }

      alert('회원탈퇴가 완료되었습니다.');
      onClose();
    } catch (err) {
      console.error(err);
      alert('회원탈퇴 중 오류가 발생했습니다.');
    }
  };

  const handleSave = async () => {
    if (isSaving) return; // 중복 클릭 방지
    setIsSaving(true);

    if (activeTab === '프로필') {
      const { member, fetchMember } = useProfileStore.getState();
      const { nickname, profileImage } = useProfileEditStore.getState();

      if (!member) {
        setIsSaving(false);
        return;
      }

      const updatedMember = {
        name: member.name,
        nickname: nickname,
        email: member.email,
        password: member.password,
        loginType: member.loginType,
        provider: member.provider,
        role: member.role,
        status: member.status,
        blacklisted: member.blacklisted,
        profileImage: profileImage ?? member.profileImage,
      };

      console.log('프로필 저장 요청 값:', updatedMember);
      try {
        const res = await fetch(`${API_BASE_URL}members`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedMember),
        });

        if (!res.ok) throw new Error('프로필 수정 실패');
        alert('프로필이 저장되었습니다.');
        fetchMember();
      } catch (err) {
        console.error(err);
        alert('저장 중 오류 발생');
      }
    } else if (activeTab === '비밀번호') {
      const { currentPassword, newPassword, confirmPassword } =
        useProfileEditStore.getState();

      if (!currentPassword || !newPassword || !confirmPassword) {
        alert('모든 비밀번호 필드를 입력해주세요.');
        setIsSaving(false);
        return;
      }

      if (newPassword !== confirmPassword) {
        alert('새 비밀번호와 확인이 일치하지 않습니다.');
        setIsSaving(false);
        return;
      }

      try {
        // 먼저 현재 비밀번호 검증
        const verifyRes = await fetch(
          `${API_BASE_URL}members/password/verify`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ currentPassword }),
          }
        );

        const verifyData = await verifyRes.json();

        if (!verifyRes.ok || verifyData.message !== '비밀번호가 일치합니다.') {
          alert('현재 비밀번호가 일치하지 않습니다.');
          setIsSaving(false);
          return;
        }

        // 검증 성공하면 새 비밀번호로 변경
        const res = await fetch(`${API_BASE_URL}members/password`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ newPassword }),
        });

        if (!res.ok) throw new Error('비밀번호 변경 실패');

        alert('비밀번호가 성공적으로 변경되었습니다.');
      } catch (err) {
        console.error(err);
        alert('비밀번호 변경 중 오류가 발생했습니다.');
      }
    }

    setIsSaving(false);
    useProfileEditStore.getState().reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="w-[500px] h-[700px] px-[25px] pt-[20px] pb-[20px] flex flex-col justify-between items-center gap-[15px] bg-[var(--gray-40)] shadow-[rgba(0,0,0,0.1)_0px_4px_20px] rounded-xl">
        {/* 닫기 버튼 */}
        <div className="w-full flex justify-end">
          <X
            size={20}
            onClick={onClose}
            className="cursor-pointer text-[var(--gray-300)] hover:text-[var(--black)]"
          />
        </div>

        {/* 탭 버튼 */}
        <div className="w-full flex justify-center gap-[15px] mb-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`text-sm font-medium px-3 py-[6px] rounded-full transition-all
            ${
              activeTab === tab
                ? 'text-white bg-[var(--primary-300)]'
                : 'text-[var(--gray-300)] hover:bg-[var(--gray-50)]'
            }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 탭 */}
        <div
          className={`flex-1 w-full bg-white rounded-lg p-4 ${
            activeTab !== '업적' ? 'p-10 pt-10' : ''
          }`}
        >
          {activeTab === '프로필' && <ProfileTab />}
          {activeTab === '비밀번호' && <PasswordTab />}
          {activeTab === '관심 분야' && <InterestTab />}
          {activeTab === '업적' && <AchievementTab />}
        </div>

        <div className="w-full flex items-center justify-between mt-4">
          <div className="w-[180px]" />

          <div className="flex justify-center flex-1">
            <Button
              buttonStyle="green"
              className="w-[180px] h-[40px] px-6"
              onClick={handleSave}
            >
              저장
            </Button>
          </div>

          <div className="w-[180px] flex justify-end">
            {activeTab === '프로필' && (
              <button
                className="text-sm text-[var(--gray-200)] underline underline-offset-2 cursor-pointer h-[40px] flex items-center"
                onClick={handleWithdraw}
              >
                회원탈퇴
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
