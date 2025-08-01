'use client'

import { MapPin, Trash2 } from 'lucide-react'
import Button from '../Button'
import DaumPostcodeEmbed from 'react-daum-postcode'
import { useState } from 'react'
import { MarkerEditProps } from '@/types/type'

export interface AddressData {
  address: string
}

export default function MarkerEdit({
  id,
  isTextArea,
  onDelete,
  address = '',
  name = '',
  description = '',
  onAddByAddress,
  onChangeName,
  onChangeDescription,
}: MarkerEditProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [isEditingName, setIsEditingName] = useState(false)

  const handleComplete = (data: AddressData) => {
    const fullAddress = data.address
    address = fullAddress
    setIsModalOpen(false)

    if (onAddByAddress) {
      onAddByAddress(fullAddress)
    }
  }

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditingName(false)
    }
  }
  return (
    <>
      <div className="flex flex-col justify-between px-[15px] py-[13px] w-full rounded-[5px] border border-[var(--primary-100)] bg-[var(--white)]">
        <div className="flex justify-between items-center mb-[3px]">
          <div className="flex gap-[10px] items-center">
            <MapPin size={24} color="var(--primary-100)" />
            {isEditingName ? (
              <input
                autoFocus
                className="text-[18px] font-semibold text-[var(--primary-100)] border-b border-[var(--primary-100)] bg-transparent outline-none"
                value={name}
                onChange={(e) => {
                  onChangeName?.(id, e.target.value)
                }}
                onKeyDown={handleNameKeyDown}
                onBlur={() => setIsEditingName(false)}
                placeholder="장소 이름을 입력해주세요."
              />
            ) : (
              <span
                className="text-[18px] text-[var(--primary-100)] font-semibold cursor-pointer"
                onClick={() => setIsEditingName(true)}
              >
                {name || '장소 이름을 입력해주세요.'}
              </span>
            )}
          </div>
          <Trash2
            size={18}
            color="red"
            onClick={onDelete}
            className="cursor-pointer"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[13px] text-[var(--primary-100)]">
            {address}
          </span>
          <Button
            className="text-[10px] font-semibold px-[23px] py-[9px]"
            onClick={() => setIsModalOpen(true)}
          >
            주소찾기
          </Button>

          {/* 모달 영역 */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/25 bg-opacity-40 flex justify-center items-center z-50">
              <div className="bg-white p-4 rounded-lg w-[400px] relative">
                <button
                  className="absolute top-2 right-2 text-gray-500"
                  onClick={() => setIsModalOpen(false)}
                >
                  ✕
                </button>
                <DaumPostcodeEmbed onComplete={handleComplete} />
              </div>
            </div>
          )}
        </div>
        {isTextArea && (
          <textarea
            className="p-[5px] mt-[20px] border border-[var(--primary-100)] rounded-[5px] h-[100px] active:border-[var(--primary-100)] focus:outline-none "
            placeholder="장소에 대한 설명을 입력해주세요."
            value={description}
            onChange={(e) => {
              onChangeDescription?.(id, e.target.value)
            }}
          ></textarea>
        )}
      </div>
    </>
  )
}
