import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useParams } from 'next/navigation';
import axiosInstance from '@/libs/axios';
import { CommentInfo } from '@/types/type';
import { toast } from 'react-toastify';
export default function CommentForm({
  variant,
  onAddComment,
}: {
  variant: string;
  onAddComment: (comment: CommentInfo) => void;
}) {
  const [content, setContent] = useState('');
  const params = useParams();
  const postId = params?.id as string;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content) {
      toast.error('댓글을 입력해주세요.');
      return;
    }

    const body = {
      content,
      roadmapId: ['roadmap', 'sharemap'].includes(variant)
        ? Number(postId)
        : null,
      questId: variant === 'quest' ? Number(postId) : null,
    };

    let url = '';
    if (variant === 'roadmap' || variant === 'sharemap')
      url = '/comments/roadmaps';
    else if (variant === 'quest') url = '/comments/quests';
    else return toast.error('유효하지 않은 variant');

    try {
      const res = await axiosInstance.post(url, body);

      // 업적 토스트 or 등록 토스트
      const message = res.data?.message ?? '';

      if (message.includes('업적')) {
        toast.success(message);
      } else {
        toast.success('댓글이 등록되었습니다.');
      }

      onAddComment(res.data.comment);
      setContent('');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error('댓글 등록 오류');
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-3.5 items-center mt-4">
      <Input
        type="text"
        placeholder="댓글을 입력해주세요"
        className="h-[44px]"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <Button
        type="submit"
        buttonStyle="green"
        className="px-6 py-2.5 text-base font-medium whitespace-nowrap cursor-pointer"
      >
        등록
      </Button>
    </form>
  );
}
