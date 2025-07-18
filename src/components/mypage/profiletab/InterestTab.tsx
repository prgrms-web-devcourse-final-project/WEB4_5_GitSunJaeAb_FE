'use client';

import { useState } from 'react';

const categories = [
  '프론트엔드',
  '백엔드',
  'AI',
  '데이터',
  '모바일',
  '게임',
  '보안',
  '클라우드',
  'UI/UX',
  '블록체인',
  'IoT',
  '로봇',
  'DevOps',
  '메타버스',
  '챗봇',
  'PM',
  'QA',
  '창업',
  '테스트1',
  '테스트2',
  '테스트3',
  '테스트4',
];

export default function InterestTab() {
  const [selected, setSelected] = useState<string[]>([
    '프론트엔드',
    'AI',
    'UI/UX',
  ]);

  const toggleCategory = (category: string) => {
    setSelected((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="mt-7 h-[300px]">
      <div className="flex justify-center">
        <p className="w-[170px] text-3xl text-[var(--primary-300)] mb-14 font-bold border-b-2 border-[var(--primary-300)]">
          관심분야 변경
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={`w-full px-4 py-2 rounded-full text-sm border transition text-center ${
              selected.includes(category)
                ? 'bg-[var(--primary-300)] text-white border-[var(--primary-300)]'
                : 'border-[var(--gray-200)] text-[var(--gray-400)]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
