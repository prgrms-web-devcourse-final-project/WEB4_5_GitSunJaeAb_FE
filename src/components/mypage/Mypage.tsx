'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import Input from '../ui/Input';
import MypageLayer from './MypageLayer';
import MypagePost from './MypagePost';

export default function Mypage() {
  const [activeTab, setActiveTab] = useState('작성글');
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <section className="w-full h-[650px] bg-[var(--gray-40)] px-48 pt-6">
      <div className="flex justify-between items-center mb-10">
        {/* 메뉴 */}
        <ul className="flex gap-8 text-lg text-[var(--gray-300)] font-medium">
          {['작성글', '참여글', '좋아요글', '레이어'].map((tab) => (
            <li
              key={tab}
              className={`pb-1 cursor-pointer border-b-2 transition-all ${
                activeTab === tab
                  ? 'text-[var(--primary-300)] border-[var(--primary-300)]'
                  : 'text-[var(--gray-300)] border-transparent'
              }`}
              onClick={() => {
                setActiveTab(tab);
                setSearchKeyword('');
              }}
            >
              {tab}
            </li>
          ))}
        </ul>

        {/* 검색 */}
        <div className="relative">
          <Input
            className="w-[250px] bg-[var(--white)] border-[var(--white)] pr-10"
            placeholder="검색어를 입력해주세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <Search
            size={16}
            strokeWidth={3}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gray-20)]"
          />
        </div>
      </div>

      <div className="mt-4 h-[calc(100%-80px)] overflow-y-auto pr-2">
        {activeTab === '레이어' ? (
          <MypageLayer searchKeyword={searchKeyword} />
        ) : (
          <MypagePost
            activeTab={activeTab as '작성글' | '참여글' | '좋아요글'}
            searchKeyword={searchKeyword}
          />
        )}
      </div>
    </section>
  );
}
