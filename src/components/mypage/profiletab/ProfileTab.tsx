'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ImagePlus, PencilLine } from 'lucide-react';
import { useProfileStore } from '@/store/profileStore';
import { useProfileEditStore } from '@/store/profileeditStore';

export default function ProfileTab() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { member, fetchMember } = useProfileStore();

  const { nickname, profileImage, setNickname, setProfileImage } =
    useProfileEditStore();

  const [isEditingName, setIsEditingName] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchMember();
  }, [fetchMember]);

  useEffect(() => {
    if (member) {
      setNickname(member.nickname ?? '');
      setProfileImage(member.profileImage ?? null);
    }
  }, [member, setNickname, setProfileImage]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditingName(false);
    }
  };

  return (
    <div className="flex flex-col items-center px-4 py-6">
      <p className="text-3xl text-[var(--primary-300)] mb-14 font-bold border-b-2 border-[var(--primary-300)]">
        프로필 변경
      </p>

      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center group relative">
          <div
            className="rounded-full size-[180px] bg-[var(--gray-100)] overflow-hidden relative cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
          >
            {profileImage ? (
              <Image
                src={
                  previewUrl ??
                  (typeof profileImage === 'string' ? profileImage : '')
                }
                alt="profile"
                fill
                sizes="96px"
                className="object-cover rounded-full transition duration-200 group-hover:brightness-75"
              />
            ) : (
              <ImagePlus className="text-[var(--gray-300)] absolute left-1/2 top-1/2 -translate-1/2" />
            )}
            <div className="absolute inset-0 bg-black/40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <PencilLine size={28} color="white" className="drop-shadow-md" />
            </div>
          </div>
          <span
            className="text-base text-[var(--primary-300)] cursor-pointer mt-2"
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

        <div className="flex gap-2 items-center ml-5 w-[250px] justify-center">
          {isEditingName ? (
            <>
              <input
                autoFocus
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                onKeyDown={handleNameKeyDown}
                onBlur={() => setIsEditingName(false)}
                className="w-full text-3xl font-semibold border-b border-[var(--gray-100)] outline-none text-center"
              />
              <div className="w-[22px]" />
            </>
          ) : (
            <>
              <span className="text-3xl font-semibold">{nickname}</span>
              <PencilLine
                size={22}
                color="var(--gray-200)"
                className="cursor-pointer"
                onClick={() => setIsEditingName(true)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
