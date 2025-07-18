'use client';

import { useEffect, useState } from 'react';
import MypageCard from '../ui/card/MypageCard';
import { MypagePostProps, RoadmapResponse } from '@/types/myprofile';
import { useProfileStore } from '@/store/profileStore';

export default function MypagePost({
  activeTab,
  searchKeyword,
}: MypagePostProps) {
  const [cards, setCards] = useState<RoadmapResponse[]>([]);
  const { member } = useProfileStore();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchRoadmaps = async () => {
      if (!member) return;

      try {
        let url = '';
        if (activeTab === '작성글') {
          url = `${API_BASE_URL}roadmaps/member?memberId=${member.id}`;
        } else if (activeTab === '좋아요글') {
          url = `${API_BASE_URL}bookmarks/bookmarkedRoadmaps`;
        } else {
          return;
        }

        const res = await fetch(url);
        const data = await res.json();
        setCards(data.roadmaps);
      } catch (err) {
        console.error('로드맵 불러오기 실패:', err);
      }
    };

    fetchRoadmaps();
  }, [activeTab, member, API_BASE_URL]);

  const mapType = (roadmap: RoadmapResponse): '공개' | '비공개' | '공유' => {
    if (roadmap.roadmapType === 'SHARED') return '공유';
    if (roadmap.roadmapType === 'PERSONAL') {
      return roadmap.isPublic ? '공개' : '비공개';
    }
    return '공개';
  };

  const toggleLike = (id: number) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, isLiked: !card.isLiked } : card
      )
    );
  };

  const filteredCards = cards.filter((card) => {
    const titleMatch = card.title
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());
    const authorMatch = card.member?.nickname
      ?.toLowerCase()
      .includes(searchKeyword.toLowerCase());
    return titleMatch || authorMatch;
  });

  return (
    <div className="grid grid-cols-4 gap-6">
      {filteredCards.map((card) => (
        <MypageCard
          key={card.id}
          title={card.title}
          date={'2025.07.07'}
          type={mapType(card)}
          mapImageUrl={card.thumbnail || '/map.png'}
          isLiked={card.isLiked}
          onToggleLike={() => toggleLike(card.id)}
          {...(activeTab === '좋아요글' && card.member
            ? {
                author: card.member.nickname,
                profileImgUrl:
                  card.member.profileImage || '/assets/userProfile.png',
              }
            : {})}
        />
      ))}
    </div>
  );
}
