'use client';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ChevronLeft, ImagePlus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function QuestWrite() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [deadline, setDeadline] = useState('');
  const [title, setTitle] = useState('');
  const [hint, setHint] = useState('');

  const handleContentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = () => {};

  return (
    <div className="max-w-xl w-full h-[760px] mx-auto mt-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* 뒤로가기 */}
      <button
        onClick={() => router.back()}
        className="flex items-center text-[var(--primary-300)] cursor-pointer mb-4"
      >
        <ChevronLeft size={18} />
        뒤로가기
      </button>

      {/* 제목 */}
      <h2 className="text-center text-2xl font-semibold mb-8">퀘스트 작성</h2>

      {/* 이미지 */}
      <div
        className="relative w-full h-60 bg-[#e4e4e4] border border-dashed border-[#e4e4e4] rounded-md p-3 mb-6 cursor-pointer flex items-center justify-center"
        onClick={handleContentClick}
      >
        {previewImage ? (
          <Image
            src={previewImage}
            alt="미리보기"
            fill
            priority
            className="object-contain"
          />
        ) : (
          <ImagePlus className="text-[var(--gray-200)] absolute left-1/2 top-1/2 -translate-1/2" />
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* 마감 기한 */}
      <div className="mb-6">
        <Input
          type="date"
          label="마감 기한 설정"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="rounded-sm"
        />
      </div>

      {/* 제목 */}
      <div className="mb-6">
        <Input
          type="text"
          label="제목"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-sm"
        />
      </div>

      {/* 힌트 */}
      <div className="mb-11">
        <Input
          type="text"
          label="힌트"
          placeholder="힌트를 입력해주세요"
          value={hint}
          onChange={(e) => setHint(e.target.value)}
          className="rounded-sm"
        />
      </div>

      <div className="flex justify-center gap-10 mt-6">
        <Button
          buttonStyle="white"
          onClick={handleCancel}
          className="w-[152px] h-[48px]"
        >
          취소하기
        </Button>
        <Button
          buttonStyle="smGreen"
          onClick={handleSubmit}
          className="w-[152px] h-[48px]"
          disabled={!title || !deadline || !hint || !previewImage}
        >
          등록하기
        </Button>
      </div>
    </div>
  );
}
