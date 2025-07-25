'use client'

import { EllipsisVertical } from 'lucide-react'
import { useState } from 'react'
import ReportModal from '../common/modal/ReportModal'
import { CommentInfo } from '@/types/type'

export default function CommentItem({
  commentInfo,
}: {
  commentInfo: CommentInfo
}) {
  const [isReportOpen, setIsReportOpen] = useState(false)
  return (
    <>
      <li className="flex flex-col gap-2 py-2">
        <div className="flex items-center gap-2">
          {/* 프로필이미지 */}
          <div className="size-[34px] bg-gray-500 rounded-full"></div>
          {/* 작성자 + 작성일 */}
          <div className="w-full">
            <div className="flex w-full justify-between">
              <h4 className="text-[15px] font-medium">
                {commentInfo.member.nickname}
              </h4>
              <EllipsisVertical
                size={16}
                className="cursor-pointer"
                onClick={() => setIsReportOpen(true)}
              />
            </div>
            <p className="text-xs text-[var(--gray-200)]">
              {commentInfo.createdAt.slice(0, 10)}
            </p>
          </div>
        </div>
        <p className="text-sm px-1.5">{commentInfo.content}</p>
      </li>

      {isReportOpen && <ReportModal onClose={() => setIsReportOpen(false)} />}
    </>
  )
}
