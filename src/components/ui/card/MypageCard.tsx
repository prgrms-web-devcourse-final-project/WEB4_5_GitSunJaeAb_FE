'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import { MypageCardProps } from '@/types/myprofile';

export default function MypageCard({
  id,
  title,
  date,
  type,
  mapImageUrl,
  author,
  profileImgUrl,
  isLiked = false,
  onToggleLike,
}: MypageCardProps & { onToggleLike?: () => void }) {
  const router = useRouter();

  const typeColorMap: Record<string, string> = {
    공개: 'bg-[#E7FAE2] text-[var(--primary-300)]',
    비공개: 'bg-[var(--gray-200)] text-[var(--white)]',
    퀘스트: 'bg-[var(--primary-200)] text-[var(--white)]',
    공유: 'bg-[#5BBBF6] text-[var(--white)]',
  };

  const badgeClass = typeColorMap[type] || 'bg-gray-200 text-gray-600';

  const handleClick = () => {
    if (type === '공개' || type === '비공개') {
      router.push(`/dashbord/roadmap/detail/${id}`);
    } else if (type === '공유') {
      router.push(`/dashbord/sharemap/detail/${id}`);
    } else if (type === '퀘스트') {
      router.push(`/dashbord/quest/detail/${id}`);
    }
  };

  const getValidSrc = (url: unknown): string => {
    if (typeof url === 'string' && /^https?:\/\/|^\/.*/.test(url.trim())) {
      return url.trim();
    }
    return '/map.png';
  };

  return (
    <div
      onClick={handleClick}
      className="w-full h-[227px] 2xl:h-[300px] bg-white overflow-hidden rounded-lg shadow-sm cursor-pointer transition-all duration-300 ease-in-out 
             hover:shadow-lg hover:-translate-y-1"
    >
      <div className="relative w-full h-2/3">
        <Image
          src={getValidSrc(mapImageUrl)}
          alt={title}
          fill
          priority
          sizes="250px"
          className="w-full h-full object-cover"
          draggable={false}
        />

        <span
          className={`absolute top-2 right-2 px-2 py-1 text-xs rounded ${badgeClass}`}
        >
          {type}
        </span>
      </div>

      {/* 텍스트 제목,날짜,하트 */}
      <div className="p-3 pl-4 2xl:p-5 flex flex-col h-1/3">
        <div className="flex items-start justify-between">
          <p className="text-base text-[var(--black)] pt-1">{title}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike?.();
            }}
            className="w-6 h-6 flex items-center justify-center text-[var(--gray-200)]"
          >
            <Heart
              size={16}
              strokeWidth={3}
              fill={isLiked ? 'var(--red)' : 'none'}
              className={`transition-colors ${
                isLiked ? 'text-[var(--red)]' : 'text-[var(--gray-200)]'
              }`}
            />
          </button>
        </div>

        <div className="pt-1 flex items-center justify-between">
          {author ? (
            <>
              <div className="flex items-center gap-2">
                {profileImgUrl && (
                  <Image
                    src={profileImgUrl}
                    alt="프로필 이미지"
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                )}
                <p className="text-sm text-[var(--gray-200)]">{author}</p>
              </div>
              <p className="text-sm text-[var(--gray-200)] pr-1">{date}</p>
            </>
          ) : (
            <p className="text-sm text-[var(--gray-200)] pr-1 ml-auto">
              {date}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
