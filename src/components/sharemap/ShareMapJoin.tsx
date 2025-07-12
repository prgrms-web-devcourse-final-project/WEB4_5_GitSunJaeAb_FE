'use client';

import { useState } from 'react';
import {
  Heart,
  Siren,
  Eye,
  ChevronDown,
  ChevronsRight,
  ChevronsLeft,
  MapPin,
  Calendar,
  ChevronLeft,
  Plus,
} from 'lucide-react';
import Button from '../ui/Button';
import ReportModal from '../common/modal/ReportModal';
import useSidebar from '@/utils/useSidebar';

import Input from '../ui/Input';
import LayerEdit from '../ui/layer/LayerEdit';

export default function ShareMapJoin() {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const { isOpen, toggle, close } = useSidebar();

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* 지도 영역 */}
      <div className="absolute inset-0 bg-gray-200 z-0">
        {/* 왼쪽 상단 버튼 */}
        <div className="absolute top-4 left-8 flex items-center gap-3 px-4 py-2 z-10">
          <Button
            buttonStyle="white"
            icon={<ChevronLeft size={18} />}
            className="text-sm"
          >
            뒤로가기
          </Button>

          {/* 레이어 선택 */}
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

      {/* 닫힌 상태에서 보이는 열기 버튼 */}
      {!isOpen && (
        <button
          onClick={toggle}
          className="absolute top-7 right-12 z-20 bg-[var(--white)] rounded-[10px] p-[10px]"
        >
          <div className="flex items-center space-x-[-16px]">
            <ChevronsLeft size={35} />
          </div>
        </button>
      )}

      {/* 사이드바 */}
      <div
        className={`absolute top-0 right-0 h-full w-[590px] bg-[var(--white)] z-10 px-6 py-8 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* 닫기 버튼 */}
        <div
          className="flex items-center mb-4 space-x-[-16px] cursor-pointer"
          onClick={close}
        >
          <ChevronsRight size={35} />
        </div>

        {/* 위치/날짜/좋아요/조회수/신고 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-[12px] text-[13px] text-[var(--gray-200)]">
            <div className="flex items-center gap-[4px]">
              <MapPin size={16} />
              <span>Seoul</span>
            </div>
            <div className="flex items-center gap-[4px]">
              <Calendar size={16} />
              <span>2025.07.14</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[15px] text-[var(--black)]">
            <div className="flex items-center gap-1">
              <Heart size={18} />
              <span>4</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={18} />
              <span>22</span>
            </div>
            <button>
              <Siren
                size={18}
                className="cursor-pointer"
                onClick={() => setIsReportOpen(true)}
              />
            </button>
          </div>
        </div>

        {/* 제목, 설명, 태그 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            서울 대학로 맛집 추천좀
          </h2>
          <p className="text-sm text-black mb-4">
            나 송지은인데 디자인 그만하고 대학로 갈거니까 맛집 알아와라
          </p>
        </div>

        {/* 레이어 목록 */}
        <div className="border-t border-[var(--gray-50)] pt-[20px]">
          <div className="flex items-center justify-between mb-[15px]">
            <h3 className="text-xl text-black">레이어 및 마커 관리</h3>
          </div>

          <div className="flex gap-2 mb-3">
            <Input
              type="text"
              placeholder="해시태그 추가"
              className="h-[44px] border-[#E4E4E4] rounded-md"
            />
            <Button
              buttonStyle="smGreen"
              className="w-[76px] h-[44px] text-3xl font-medium"
            >
              <Plus size={30} />
            </Button>
          </div>

          <div className="relative mb-3">
            <select
              className="w-full h-[44px] text-sm border border-[#E4E4E4] rounded px-3 appearance-none"
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

          <div className="flex justify-end mt-4 gap-5">
            <Button
              buttonStyle="white"
              className="text-[18px] w-[80px] h-[40px] text-[var(--black)] font-semibold"
            >
              취소
            </Button>
            <Button
              buttonStyle="smGreen"
              className="text-[18px] w-[80px] h-[40px]"
            >
              완료
            </Button>
          </div>
        </div>
      </div>

      {/* 신고 모달 */}
      {isReportOpen && <ReportModal onClose={() => setIsReportOpen(false)} />}
    </section>
  );
}
