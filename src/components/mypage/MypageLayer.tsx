'use client';

import { useEffect, useState } from 'react';
import { Layer, LayerWithTitle } from '@/types/myprofile';

export default function MypageLayer({
  searchKeyword,
}: {
  searchKeyword: string;
}) {
  const [layers, setLayers] = useState<LayerWithTitle[]>([]);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchLayers = async () => {
      try {
        const memberId = 2;
        const res = await fetch(
          `${API_BASE_URL}layers/member?memberId=${memberId}`
        );
        const data = await res.json();
        const fetchedLayers: Layer[] = data.layers;

        const roadmapIds = [
          ...new Set(
            fetchedLayers
              .map((layer) => layer.roadmap)
              .filter((id): id is number => typeof id === 'number')
          ),
        ];

        const titleMap: Record<number, string> = {};
        const titlePromises = roadmapIds.map(async (id) => {
          const res = await fetch(`${API_BASE_URL}roadmaps/${id}`);
          if (!res.ok) throw new Error(`로드맵 ${id} 불러오기 실패`);
          const data = await res.json();
          titleMap[id] = data.roadmap.title;
        });

        await Promise.all(titlePromises);

        const layersWithTitle: LayerWithTitle[] = fetchedLayers.map(
          (layer) => ({
            ...layer,
            roadmapTitle: layer.roadmap ? titleMap[layer.roadmap] : undefined,
          })
        );

        setLayers(layersWithTitle);
      } catch (err) {
        console.error('데이터 불러오기 실패:', err);
      }
    };

    fetchLayers();
  }, [API_BASE_URL]);

  const handleDelete = async (layerId: number) => {
    const confirmed = window.confirm('정말 삭제하시겠습니까?');
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_BASE_URL}layers/${layerId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('레이어 삭제 실패');
      }

      setLayers((prev) => prev.filter((layer) => layer.id !== layerId));
      alert('삭제가 완료되었습니다.');
    } catch (err) {
      console.error(err);
      alert('레이어 삭제 중 오류가 발생했습니다.');
    }
  };

  const filteredLayers = layers.filter((layer) => {
    const keyword = searchKeyword.toLowerCase();
    return (
      layer.member.nickname.toLowerCase().includes(keyword) ||
      layer.name.toLowerCase().includes(keyword) ||
      layer.roadmapTitle?.toLowerCase().includes(keyword)
    );
  });

  return (
    <table className="min-w-full text-sm text-left border-t border-[#606060]">
      <thead className="text-[#222222] text-base font-medium">
        <tr>
          <th className="py-3 px-4">작성자</th>
          <th className="py-3 px-4">레이어명</th>
          <th className="py-3 px-4">적용된 게시글</th>
          <th className="py-3 px-4">수정</th>
          <th className="py-3 px-4">삭제</th>
        </tr>
      </thead>
      <tbody>
        {filteredLayers.map((layer) => (
          <tr
            key={layer.id}
            className="border-t border-b border-[#606060] text-sm"
          >
            <td className="py-3 px-4">{layer.member.nickname}</td>
            <td className="py-3 px-4">{layer.name}</td>
            <td className="py-3 px-4">{layer.roadmapTitle || '제목 없음'}</td>
            <td className="py-3 px-4">
              <button className="text-[13px] text-[var(--primary-300)] underline cursor-pointer">
                수정
              </button>
            </td>
            <td className="py-3 px-4">
              <button
                onClick={() => handleDelete(layer.id)}
                className="text-[13px] text-[var(--red)] underline cursor-pointer"
              >
                삭제
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
