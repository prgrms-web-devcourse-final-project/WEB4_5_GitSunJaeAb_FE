'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import axiosInstance from '@/libs/axios';
import { Achievement } from '@/types/myprofile';
import { Lock } from 'lucide-react';
import AchievementSkeleton from '../skeleton/AchievementSkeleton';

export default function AchievementTab() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [achievedIds, setAchievedIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const [allRes, memberRes] = await Promise.all([
          axiosInstance.get('/achievements'),
          axiosInstance.get('/achievements/member'),
        ]);

        setAchievements(allRes.data.achievements || []);
        setAchievedIds(
          memberRes.data.memberAchievements?.map((a: { id: number }) => a.id) ||
            []
        );
      } catch (err) {
        console.error('업적 불러오기 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const achievedCount = achievements.filter((a) =>
    achievedIds.includes(a.id)
  ).length;
  const progress = achievements.length
    ? Math.round((achievedCount / achievements.length) * 100)
    : 0;

  return (
    <div className="flex flex-col gap-6 mt-4 h-[520px]">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-[var(--gray-800)]">업적</h2>
        <div className="w-full bg-[var(--gray-100)] h-3 rounded-full overflow-hidden">
          <div
            className="bg-[var(--primary-300)] h-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-[var(--gray-400)]">
          전체 업적 {achievements.length}개 중 {achievedCount}개 달성 (
          {progress}%)
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 overflow-y-auto pr-1">
        {isLoading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <AchievementSkeleton key={idx} />
            ))
          : achievements
              .sort((a, b) => {
                const aAch = achievedIds.includes(a.id);
                const bAch = achievedIds.includes(b.id);
                return aAch === bAch ? 0 : aAch ? -1 : 1;
              })
              .map((achieve) => {
                const achieved = achievedIds.includes(achieve.id);

                return (
                  <div
                    key={achieve.id}
                    className={`flex flex-col items-center justify-center p-5 rounded-xl border text-center transition-all duration-200 bg-white border-[var(--gray-100)] ${
                      !achieved ? 'opacity-40' : ''
                    }`}
                  >
                    <div className="w-24 h-24 rounded-full overflow-hidden relative mb-3 flex items-center justify-center bg-[var(--gray-100)]">
                      {achieved ? (
                        <Image
                          src={
                            achieve.image?.trim()
                              ? achieve.image
                              : '/이미지없다.jpg'
                          }
                          alt={achieve.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      ) : (
                        <Lock className="w-8 h-8 text-[var(--gray-400)]" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-[var(--black)]">
                      {achieve.name}
                    </span>
                  </div>
                );
              })}
      </div>
    </div>
  );
}
