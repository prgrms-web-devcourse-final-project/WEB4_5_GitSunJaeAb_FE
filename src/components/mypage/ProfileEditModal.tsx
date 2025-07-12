'use client'

import { PencilLine, X } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useRef, useState } from 'react'
import Image from 'next/image'

export default function ProfileEditModal({ onClose }: { onClose: () => void }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [username, setUsername] = useState('사용자 이름')
  const [isEditingName, setIsEditingName] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageSrc(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditingName(false)
    }
  }
  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
        <div className="w-[390px] px-[25px] pt-[20px] pb-[30px] flex flex-col justify-between items-center gap-[15px] bg-white rounded-[10px]">
          <div className="w-full flex justify-end">
            <X size={20} onClick={onClose} className="cursor-pointer" />
          </div>
          <div className="flex flex-col gap-[10px] items-center">
            {/* 프로필 이미지 영역 */}
            <div className="rounded-full size-[140px] bg-[var(--gray-200)] overflow-hidden relative">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt="profile"
                  fill
                  className="object-cover rounded-full"
                  style={{ objectFit: 'cover' }}
                />
              ) : null}
            </div>
            <span
              className="text-[13px] text-[var(--primary-300)] cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              사진 변경
            </span>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          <div className="flex gap-[5px] items-center">
            {isEditingName ? (
              <input
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleNameKeyDown}
                onBlur={() => setIsEditingName(false)}
                className="text-[20px] font-semibold border-b border-[var(--gray-100)] outline-none"
              />
            ) : (
              <>
                <span className="text-[20px] font-semibold">{username}</span>
                <PencilLine
                  size={18}
                  color="var(--gray-100)"
                  className="cursor-pointer"
                  onClick={() => setIsEditingName(true)}
                />
              </>
            )}
          </div>
          <div className="w-full">
            <span>현재 비밀번호</span>
            <Input />
          </div>
          <div className="w-full">
            <span>새 비밀번호</span>
            <Input />
          </div>
          <div className="w-full">
            <span>새 비밀번호 확인</span>
            <Input />
          </div>
          <Button
            buttonStyle="green"
            className="w-[180px] h-[38px] px-6"
            onClick={onClose}
          >
            프로필 수정
          </Button>
        </div>
      </div>
    </>
  )
}
