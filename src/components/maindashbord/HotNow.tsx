'use client';

import { getPopularCategories } from '@/libs/category';
import { LandingCategories } from '@/types/type';
import { useQueries, useQuery } from '@tanstack/react-query';
import SkeletonCategoryCard from './SkeletonCategoryCard';
import defaultCategoryImg from '../../../public/assets/defaultCategory.avif';
import { getRoadmapCount } from '@/libs/mainDashboard';
import { toast } from 'react-toastify';

export default function HotNow({
  onCategorySelect,
}: {
  onCategorySelect: (category: LandingCategories) => void;
}) {
  // 인기 카테고리 조회
  const {
    data: categories,
    isPending,
    isError,
  } = useQuery<LandingCategories[]>({
    queryKey: ['topCategories'],
    queryFn: getPopularCategories,
  });

  // 인기 카테고리별 게시글 수
  const countQueries = useQueries({
    queries:
      categories?.map((cat) => ({
        queryKey: ['roadmapCount', cat.id],
        queryFn: () => getRoadmapCount(cat.id),
        enabled: !!categories,
      })) || [],
  });

  // 로딩중일때는 스켈레톤
  if (isPending) {
    return (
      <section className="bg-[var(--primary-50)] h-[406px] flex items-center justify-center px-4">
        <div className="text-center">
          <h3 className="text-3xl font-semibold text-[var(--primary-300)] mb-8">
            What’s Hot Now
          </h3>
          <div className="flex justify-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-7">
              <SkeletonCategoryCard repeat={5} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 에러 콘솔
  if (isError || !categories) {
    toast.error('인기 카테고리 불러오는 중 에러');
  }

  // 클릭 시 로드맵으로 이동 연결?
  return (
    <section className="bg-[var(--primary-50)] h-[406px] flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-3xl font-semibold text-[var(--primary-300)] mb-[30px]">
          What’s Hot Now
        </h3>
        {/* 인기 카테고리 */}
        <div className="w-[1100px] mx-auto">
          <div className="flex justify-between cursor-pointer">
            {categories?.map((cat, index) => {
              const postCount = countQueries[index]?.data;
              const isCountLoading = countQueries[index]?.isPending;
              return (
                <div
                  key={cat.id}
                  onClick={() => onCategorySelect(cat)}
                  className="w-[200px] h-[200px] rounded-xl overflow-hidden"
                >
                  <div
                    className="w-full h-full flex items-center justify-center p-2 bg-center bg-cover 
                          transition-transform duration-500 hover:scale-110"
                    style={{
                      backgroundImage: `url(${
                        cat.categoryImage || defaultCategoryImg.src
                      })`,
                    }}
                  >
                    <p className="bg-[var(--black)]/40 p-3 w-20 rounded-[4px] text-[var(--white)] text-sm text-center">
                      {cat.name}
                      <br />
                      {isCountLoading ? '...' : `${postCount ?? 0}개`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
