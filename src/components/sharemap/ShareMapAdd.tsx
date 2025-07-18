'use client';

import { useState } from 'react';
import { ChevronDown, ChevronLeft, Plus } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import LayerEdit from '../ui/layer/LayerEdit';
import { api } from '@/libs/api';
import Link from 'next/link';

export default function ShareMapAdd() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [region, setRegion] = useState('');
  const [categoryId, setCategoryId] = useState<number>(9007199254740991); // 카테고리 선택 시 이 값 바꿔도 됨
  const thumbnail =
    'https://cdn.pixabay.com/photo/2023/06/04/20/21/cat-8040862_1280.jpg';
  const isPublic = true;

  const handleSubmit = async () => {
    if (!title || !description || !categoryId) {
      console.log('필수 값을 입력해주세요.');
      return;
    }

    try {
      const res = await api('/roadmaps/shared', {
        method: 'POST',
        body: {
          categoryId,
          title,
          description,
          thumbnail,
          isPublic,
        },
      });

      console.log('작성 완료:', res);
    } catch (err) {
      console.error('작성 실패:', err);
    }
  };

  return (
    <section className="flex h-screen overflow-hidden">
      {/* 왼쪽 지도 */}
      <div className="w-4/6 bg-gray-200 relative">
        <div className="absolute top-4 left-8 flex items-center gap-3 px-4 py-2 z-10">
          <Button
            buttonStyle="white"
            icon={<ChevronLeft size={18} />}
            className="text-sm"
          >
            뒤로가기
          </Button>

          <div className="relative w-[140px]">
            <select
              className="w-full h-[34px] text-sm bg-white border-none rounded pl-3 appearance-none"
              defaultValue=""
            >
              <option value="" disabled hidden>
                레이어 이름
              </option>
              <option>레이어 1</option>
              <option>레이어 2</option>
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-black"
            />
          </div>
        </div>
      </div>

      <div className="w-2/6 px-6 py-8 space-y-6 bg-white overflow-y-auto scrollbar-none">
        {/* 제목 */}
        <div className="space-y-2">
          <label className="text-lg text-black">제목</label>
          <Input
            type="text"
            placeholder="제목을 입력해주세요."
            className="h-[40px] border-[#E4E4E4] rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* 내용 */}
        <div className="space-y-2">
          <label className="text-lg text-black">내용</label>
          <Input
            type="text"
            placeholder="내용을 입력해주세요."
            className="h-[40px] border-[#E4E4E4] rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* 지역 */}
        <div className="space-y-2">
          <label className="text-lg text-black">지역</label>
          <Input
            type="text"
            placeholder="지역을 입력해주세요."
            className="h-[40px] border-[#E4E4E4] rounded-md"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </div>

        {/* 기간 */}
        <div className="space-y-2">
          <label className="text-lg text-black">기간</label>
          <Input
            type="date"
            placeholder="기간을 입력해주세요."
            className="h-[40px] border-[#E4E4E4] rounded-md"
          />
        </div>

        {/* 해시태그 */}
        <div className="space-y-2">
          <label className="text-lg text-black">해시태그</label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="해시태그 추가"
              className="h-[40px] border-[#E4E4E4] rounded-md"
            />
            <Button
              buttonStyle="smGreen"
              className="w-[80px] h-[40px] text-3xl font-medium"
            >
              <Plus size={25} />
            </Button>
          </div>
          <div className="flex gap-2 text-sm text-[#005C54] mt-1">
            <span>
              #태그1 <button className="ml-1 text-black">×</button>
            </span>
            <span>
              #태그2 <button className="ml-1 text-black">×</button>
            </span>
          </div>
        </div>

        {/* 레이어 */}
        <div className="border-t border-gray-300 pt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl text-black">레이어 및 마커 관리</h3>
          </div>

          <div className="flex gap-2 mb-3">
            <Input
              type="text"
              placeholder="새 레이어 추가"
              className="h-[40px] border-[#E4E4E4] rounded-md"
            />
            <Button
              buttonStyle="smGreen"
              className="w-[80px] h-[40px] text-3xl font-medium"
            >
              <Plus size={25} />
            </Button>
          </div>

          <div className="relative mb-3">
            <select
              className="w-full h-[40px] text-sm border border-[#E4E4E4] rounded px-3 appearance-none"
              defaultValue=""
            >
              <option value="" disabled hidden>
                레이어 선택
              </option>
              <option>게임</option>
              <option>여행</option>
              <option>맛집</option>
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black"
            />
          </div>

          <div className="space-y-3">
            <LayerEdit title="레이어1" isTextArea />
            <LayerEdit title="레이어1" isTextArea />
            <LayerEdit title="레이어1" isTextArea />
          </div>

          <div className="flex justify-end mt-4 gap-2">
            <Button buttonStyle="white" className="text-sm w-[60px] h-[35px]">
              취소
            </Button>
            <Link href="/dashbord/sharemap">
              <Button
                buttonStyle="smGreen"
                className="text-sm w-[60px] h-[35px]"
                onClick={handleSubmit}
              >
                완료
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
