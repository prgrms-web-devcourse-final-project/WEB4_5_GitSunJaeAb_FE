'use client';

import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { CircleAlert, Medal } from 'lucide-react';
import ProfileEditModal from './ProfileEditModal';
import Image from 'next/image';
import { useProfileStore } from '@/store/profileStore';

export default function MypageLabel() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const member = useProfileStore((state) => state.member);
  const fetchMember = useProfileStore((state) => state.fetchMember);

  // 프로필 정보 불러오기
  useEffect(() => {
    fetchMember();
  }, [fetchMember]);

  // 모달 열릴 때 body 스크롤 막기
  useEffect(() => {
    document.body.style.overflow = isEditOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isEditOpen]);

  return (
    <>
      <div className="flex items-center gap-6 h-[150px] px-48 mb-5">
        {/* 프로필 이미지 */}
        <div className="relative -top-13 w-[140px] h-[140px] rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          <Image
            src={member?.profileImage || '/assets/userProfile.png'}
            alt="프로필 이미지"
            fill
            sizes="140px"
            priority
            className="object-cover"
          />
        </div>

        {/* 프로필 정보 */}
        <div className="flex justify-between items-start flex-1 mt-[-40px]">
          <div>
            <div className="flex items-center gap-2 text-2xl font-semibold">
              {member?.nickname || '닉네임'}
              <span>
                <Medal size={20} className="text-[#D5A208]" />
              </span>
              <span>
                <CircleAlert size={20} className="text-[#74B9FF]" />
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {['음식', '역사', '삼국지', '신라'].map((tag) => (
                <span
                  key={tag}
                  className="h-[26px] bg-[#EBF2F2] text-[#005C54] text-sm py-1 px-3 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <Button
            buttonStyle="green"
            className="w-[180px] h-[38px] px-6 mt-1"
            onClick={() => setIsEditOpen(true)}
          >
            프로필 수정
          </Button>
        </div>
      </div>

      {isEditOpen && <ProfileEditModal onClose={() => setIsEditOpen(false)} />}
    </>
  );
}
