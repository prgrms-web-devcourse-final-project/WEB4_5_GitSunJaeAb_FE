'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import { CircleAlert, Medal } from 'lucide-react';
import ProfileEditModal from './ProfileEditModal';

export default function MypageLabel() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  return (
    <>
      <div className="flex items-center gap-6 h-[150px] px-48 mb-5">
        {/* 프로필 */}
        <div className="relative -top-13 w-[140px] h-[140px] rounded-full overflow-hidden bg-gray-200" />
        <div className="flex justify-between items-start flex-1 mt-[-40px]">
          <div>
            <div className="flex items-center gap-2 text-2xl font-semibold">
              지지지{' '}
              <span>
                <Medal size={20} className="text-[#D5A208]" />
              </span>{' '}
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
