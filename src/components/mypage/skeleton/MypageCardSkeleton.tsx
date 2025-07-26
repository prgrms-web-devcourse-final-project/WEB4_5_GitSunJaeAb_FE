export default function MypageCardSkeleton() {
  return (
    <div className="w-full h-[227px] 2xl:h-[300px] bg-white overflow-hidden rounded-lg shadow-sm animate-pulse">
      {/* 이미지 영역 */}
      <div className="relative w-full h-2/3 bg-gray-200" />

      {/* 텍스트 영역 */}
      <div className="p-3 pl-4 2xl:p-5 flex flex-col h-1/3 justify-between">
        {/* 제목 + 하트 */}
        <div className="flex items-start justify-between">
          <div className="w-2/3 h-4 bg-gray-300 rounded" />
          <div className="w-5 h-5 bg-gray-300 rounded-full" />
        </div>

        {/* 날짜 + 작성자 */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-300 rounded-full" />
            <div className="w-16 h-3 bg-gray-300 rounded" />
          </div>
          <div className="w-12 h-3 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
}
