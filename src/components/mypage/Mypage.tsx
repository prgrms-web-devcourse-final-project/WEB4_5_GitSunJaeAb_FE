'use client';

import { useState } from 'react';
import MypageLayer from './MypageLayer';
import MypagePost from './MypagePost';
import SearchInput from '../ui/SearchInputs';
import MypageComment from './MypageComment';

export default function Mypage() {
  const [activeTab, setActiveTab] = useState('작성글');
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <section className="w-full h-[650px] bg-[var(--gray-40)] px-48 pt-6">
      <div className="flex justify-between items-center mb-10">
        {/* 메뉴 */}
        <ul className="flex gap-8 text-lg text-[var(--gray-300)] font-medium">
          {['작성글', '참여글', '좋아요글', '댓글', '레이어'].map((tab) => (
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
          <SearchInput
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            inputClassName="bg-[var(--white)] border-[var(--white)]"
          />
        </div>
      </div>

      <div className="mt-4 h-[calc(100%-80px)] overflow-y-auto pr-2">
        {activeTab === '댓글' ? (
          <MypageComment searchKeyword={searchKeyword} />
        ) : activeTab === '레이어' ? (
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
