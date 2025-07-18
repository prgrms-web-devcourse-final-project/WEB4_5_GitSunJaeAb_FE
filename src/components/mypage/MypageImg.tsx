'use client';

import Image from 'next/image';

export default function MypageImg() {
  return (
    <>
      {/* 나중에 이미지 어울리는거 넣기 */}
      <div className="w-full h-[300px] bg-gray-300 relative">
        <Image
          src="/mypageimg.svg"
          alt="배경 이미지"
          fill
          priority
          className="object-cover"
        />
      </div>
    </>
  );
}
