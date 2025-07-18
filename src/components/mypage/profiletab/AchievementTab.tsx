'use client';

import Image from 'next/image';
import { useState } from 'react';

const dummyAchievements = [
  {
    id: 1,
    title: '첫 로드맵 완성',
    description: '처음으로 로드맵을 작성했어요!',
    icon: '/assets/404.svg',
    achieved: true,
  },
  {
    id: 2,
    title: '10개 로드맵 업로드',
    description: '로드맵 10개를 작성했어요.',
    icon: '/assets/404.svg',
    achieved: true,
  },
  {
    id: 3,
    title: '좋아요 100개 돌파',
    description: '받은 좋아요가 100개를 넘었어요.',
    icon: '/assets/404.svg',
    achieved: false,
  },
  {
    id: 4,
    title: '첫 댓글 작성',
    description: '처음으로 댓글을 남겼어요.',
    icon: '/assets/404.svg',
    achieved: true,
  },
  {
    id: 5,
    title: '첫 댓글 작성',
    description: '처음으로 댓글을 남겼어요.',
    icon: '/assets/404.svg',
    achieved: false,
  },
  {
    id: 6,
    title: '첫 댓글 작성',
    description: '처음으로 댓글을 남겼어요.',
    icon: '/assets/404.svg',
    achieved: false,
  },
  {
    id: 7,
    title: '첫 댓글 작성',
    description: '처음으로 댓글을 남겼어요.',
    icon: '/assets/404.svg',
    achieved: false,
  },
  {
    id: 8,
    title: '첫 댓글 작성',
    description: '처음으로 댓글을 남겼어요.',
    icon: '/assets/404.svg',
    achieved: false,
  },
];

export default function AchievementTab() {
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 2
        ? [...prev, id]
        : prev
    );
  };

  const achievedCount = dummyAchievements.filter((a) => a.achieved).length;
  const progress = Math.round((achievedCount / dummyAchievements.length) * 100);

  return (
    <div className="flex flex-col gap-6 mt-4 h-[440px]">
      {/* 제목, 진행률 */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-[var(--gray-800)]">업적</h2>
        <div className="w-full bg-[var(--gray-100)] h-3 rounded-full overflow-hidden">
          <div
            className="bg-[var(--primary-300)] h-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-[var(--gray-400)]">
          전체 업적 {dummyAchievements.length}개 중 {achievedCount}개 달성 (
          {progress}%)
        </p>
      </div>

      {/* 업적 */}
      <div className="flex flex-col gap-3 max-h-[480px] overflow-y-auto pr-2">
        {[...dummyAchievements]
          // achieved가 true인것들부터 false보다 위로
          .sort((a, b) => (a.achieved === b.achieved ? 0 : a.achieved ? -1 : 1))
          .map((achieve) => {
            const isSelected = selected.includes(achieve.id);
            return (
              <div
                key={achieve.id}
                className={`flex items-center gap-4 px-4 py-3 border rounded-md cursor-pointer transition ${
                  achieve.achieved
                    ? isSelected
                      ? 'bg-[var(--primary-50)] border-[var(--primary-300)]'
                      : 'bg-white border-[var(--gray-100)]'
                    : 'bg-[var(--gray-50)] border-[var(--gray-100)] opacity-50'
                }`}
                onClick={() => achieve.achieved && toggleSelect(achieve.id)}
              >
                <div className="w-12 h-12 relative">
                  <Image
                    src={achieve.icon}
                    alt={achieve.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-[var(--black)]">
                    {achieve.title}
                  </span>
                  <span className="text-sm text-[var(--gray-400)]">
                    {achieve.description}
                  </span>
                </div>
                {isSelected && (
                  <span className="ml-auto text-xs text-[var(--primary-300)] font-medium">
                    프로필 표시 중
                  </span>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
