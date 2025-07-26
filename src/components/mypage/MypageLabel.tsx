'use client';

import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import ProfileEditModal from './ProfileEditModal';
import Image from 'next/image';
import { useProfileStore } from '@/store/profileStore';
import defaultProfile from '../../../public/assets/defaultProfile.png';

export default function MypageLabel() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const member = useProfileStore((state) => state.member);
  const fetchMember = useProfileStore((state) => state.fetchMember);

  useEffect(() => {
    if (!member) {
      fetchMember();
    }
  }, [member, fetchMember]);

  useEffect(() => {
    document.body.style.overflow = isEditOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isEditOpen]);

  return (
    <>
      <div className="flex items-center gap-6 h-[150px] px-48 mb-5">
        <div className="relative -top-13 w-[140px] h-[140px] rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          <Image
            src={member?.profileImage || defaultProfile}
            alt="프로필 이미지"
            fill
            sizes="140px"
            priority
            className="object-cover"
          />
        </div>

        <div className="flex justify-between items-start flex-1 mt-[-40px]">
          <div>
            <div className="flex items-center gap-2 text-2xl font-semibold">
              {member?.nickname || '닉네임'}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {(
                member?.memberInterests?.flatMap((interest) =>
                  interest.categories.map((cat) => cat.name)
                ) ?? []
              ).map((tag) => (
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
