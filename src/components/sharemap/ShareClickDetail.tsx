'use client';

import { useState } from 'react';
import {
  Heart,
  Siren,
  Eye,
  Download,
  ChevronDown,
  ChevronsRight,
  ChevronsLeft,
  MapPin,
  Calendar,
  ChevronLeft,
} from 'lucide-react';
import Button from '../ui/Button';
import ReportModal from '../common/modal/ReportModal';
import useSidebar from '@/utils/useSidebar';
import Link from 'next/link';
import LayerDetail from '../ui/layer/LayerDetail';
import MarkerDetail from '../ui/layer/MarkerDetail';
import Toggle from '../ui/Toggle';

import { useRouter } from 'next/navigation';

export default function ShareClickDetail() {
  const router = useRouter();
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
            onClick={() => router.back()}
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
        <div className="h-full px-5 py-4 overflow-y-auto scrollbar-none">
          {/* 닫기 버튼 */}
          <div className="flex items-center mb-5 gap-[10px]">
            <ChevronsRight
              size={35}
              onClick={close}
              className="cursor-pointer"
            />
            <h1 className="font-semibold text-xl">공유지도 상세보기</h1>
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
            <h2 className="text-2xl font-semibold mb-2">
              서울 대학로 맛집 추천좀
            </h2>
            <p className="text-[16px] text-black mb-2">
              나 송지은인데 디자인 그만하고 대학로 갈거니까 맛집 알아와라
            </p>
            <div className="flex gap-2 text-sm text-[#005C54] mb-2">
              <span>#태그1</span>
              <span>#태그2</span>
            </div>
            <div className="flex gap-[5px] items-center mb-5">
              <div className="rounded-full bg-amber-950 size-[25px]"></div>
              <span className="text-sm">작성자 닉네임</span>
            </div>
          </div>

          {/* 토글 스위치 */}
          <div className="space-y-3 border-t border-gray-300 pt-5 mb-6">
            <Toggle label="경로" />
            <Toggle label="애니메이션" />
          </div>

          {/* 레이어 목록 */}
          <div className="border-t border-[var(--gray-50)] space-y-[15px] mt-4">
            <div className="flex items-center justify-between mt-4 mb-4 mr-3">
              <h3 className="text-xl text-black">레이어 및 마커</h3>
              <Download size={20} className="cursor-pointer text-[#000]" />
            </div>
            <LayerDetail title="레이어1">
              <MarkerDetail isTextArea />
            </LayerDetail>
            <LayerDetail title="레이어2">
              <MarkerDetail isTextArea />
              <MarkerDetail isTextArea />
              <MarkerDetail isTextArea />
            </LayerDetail>
            <LayerDetail title="레이어3">
              <MarkerDetail isTextArea />
              <MarkerDetail isTextArea />
            </LayerDetail>
          </div>

          {/* 참여하기 버튼 */}
          <Link href="/dashbord/sharemap/detail/1/preview/mapjoin">
            <div className="flex justify-end pt-6">
              <Button
                buttonStyle="smGreen"
                className="w-[114px] h-[40px] text-[18px] font-semibold"
              >
                참여하기
              </Button>
            </div>
          </Link>
        </div>
      </div>

      {/* 신고 모달 */}
      {isReportOpen && <ReportModal onClose={() => setIsReportOpen(false)} />}
    </section>
  );
}
