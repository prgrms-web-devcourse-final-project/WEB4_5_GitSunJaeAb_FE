'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '@/libs/axios';
import MypageLayerSkeleton from './skeleton/MypageLayerSkeleton';
import { CommentItem } from '@/types/myprofile';

export default function MypageComment({
  searchKeyword,
}: {
  searchKeyword: string;
}) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axiosInstance.get('/comments/member');
        const commentList = res.data.comments;

        const enriched = await Promise.all(
          commentList.map(async (comment: Omit<CommentItem, 'postTitle'>) => {
            const isRoadmap = !!comment.roadmap;
            const targetId = isRoadmap ? comment.roadmap : comment.quest;
            console.log(targetId);
            const endpoint = isRoadmap
              ? `/roadmaps/${targetId}`
              : `/quests/${targetId}`;

            let postTitle = '제목 없음';
            try {
              const postRes = await axiosInstance.get(endpoint);
              if (isRoadmap) {
                postTitle = postRes.data.roadmap?.title ?? '제목 없음';
              } else {
                postTitle = postRes.data.quest?.title ?? '제목 없음';
              }
            } catch {}

            return {
              ...comment,
              postTitle,
            };
          })
        );

        setComments(enriched);
      } catch (err) {
        console.error('댓글 불러오기 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const filtered = comments.filter((c) => {
    const keyword = searchKeyword.toLowerCase();
    return (
      c.content.toLowerCase().includes(keyword) ||
      c.postTitle.toLowerCase().includes(keyword)
    );
  });

  return (
    <table className="min-w-full text-sm text-left border-t border-[#606060]">
      <thead className="text-[var(--black)] text-base font-medium">
        <tr>
          <th className="py-3 px-4">댓글 내용</th>
          <th className="py-3">게시글종류</th>
          <th className="py-3 px-4">적용된 게시글</th>
          <th className="py-3 px-8">작성일</th>
        </tr>
      </thead>

      <tbody>
        {loading ? (
          Array.from({ length: 1 }).map((_, i) => (
            <tr key={i} className="border-t border-b border-[var(--gray-300)]">
              <td className="py-3 px-4">
                <MypageLayerSkeleton className="h-4 w-24" />
              </td>
              <td className="py-3">
                <MypageLayerSkeleton className="h-4 w-15" />
              </td>
              <td className="py-3 px-4">
                <MypageLayerSkeleton className="h-4 w-40" />
              </td>
              <td className="py-3 px-8">
                <MypageLayerSkeleton className="h-4 w-12" />
              </td>
            </tr>
          ))
        ) : filtered.length === 0 ? (
          <tr>
            <td
              colSpan={4}
              className="text-center py-10 text-[var(--gray-300)] font-medium"
            >
              작성한 댓글이 없습니다.
            </td>
          </tr>
        ) : (
          filtered.map((c) => (
            <tr
              key={c.id}
              className="border-t border-b border-[#606060] text-sm"
            >
              <td className="py-3 px-4">{c.content}</td>
              <td className="py-3 px-4">
                {c.roadmap ? '로드맵' : c.quest ? '퀘스트' : '-'}
              </td>
              <td className="py-3 px-4">{c.postTitle}</td>
              <td className="py-3 px-4">{c.createdAt.split('T')[0] ?? '-'}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
