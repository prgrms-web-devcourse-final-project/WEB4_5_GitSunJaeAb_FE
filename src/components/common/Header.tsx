'use client';

import { Bell, Search, X } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import SearchModal from '../search/SearchModal';
import { useClickOut } from '@/hooks/useClickOut';
import Notification from '../notification/Notification';
import { usePathname } from 'next/navigation';
import { HeaderProps } from '@/types/type';
import UserModal from './modal/UserModal';
import { useAuthStore } from '@/store/useAuthStore';
import defaultProfile from '../../../public/assets/defaultProfile.png';
import Image from 'next/image';

export default function Header({ isAdmin = false }: HeaderProps) {
  const pathname = usePathname();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const notiRef = useRef<HTMLDivElement>(null);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);

  useClickOut(searchRef, () => setIsSearchOpen(false));
  useClickOut(notiRef, () => setIsNotiOpen(false));
  useClickOut(userRef, () => setIsUserModalOpen(false));

  const handleSearch = () => setIsSearchOpen((prev) => !prev);
  const handleNoti = () => setIsNotiOpen((prev) => !prev);

  const user = useAuthStore((state) => state.user);
  const profileImage = user?.profileImage ?? defaultProfile;

  const userNavItems = [
    { name: '로드맵', href: '/dashbord/roadmap' },
    { name: '공유지도', href: '/dashbord/sharemap' },
    { name: '퀘스트', href: '/dashbord/quest' },
  ];

  const adminNavItems = [
    { name: '신고 내역', href: '/admin/report' },
    { name: '사용자 관리', href: '/admin/users' },
    { name: '기타 관리', href: '/admin/manage' },
    { name: '공유지도', href: '/admin/sharemap' },
    { name: '관리자공지', href: '/admin/notice' },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <header className="w-full h-20 px-11 flex items-center justify-between bg-[var(--white)] relative">
      {/* 로고 */}
      <Link
        href={!isAdmin ? '/' : '/'}
        className="text-3xl text-[var(--primary-300)] font-[vitro-core]"
      >
        MAPICK
      </Link>

      {/* 네비게이션 메뉴 */}
      <nav>
        <ul className="flex items-center gap-[60px] text-[21px] text-[var(--black)]">
          {navItems.map(({ name, href }) => {
            const isActive = pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`transition cursor-pointer pb-1 ${
                    isActive
                      ? 'text-[var(--primary-300)] border-b-2 border-[var(--primary-300)]'
                      : 'text-[var(--black)]'
                  }`}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 우측 아이콘 */}
      <div className="flex items-center gap-6 text-[var(--black)]">
        {!isAdmin && (
          <>
            {/* 알림 아이콘 */}
            <Bell
              size={30}
              strokeWidth={1.7}
              className="cursor-pointer hover:text-[var(--primary-300)]"
              onClick={handleNoti}
            />
            {/* 검색 아이콘 or 닫기 아이콘 */}
            {isSearchOpen ? (
              <X
                size={30}
                strokeWidth={1.7}
                className="cursor-pointer hover:text-[var(--primary-300)]"
                onClick={() => setIsSearchOpen(false)}
              />
            ) : (
              <Search
                size={30}
                strokeWidth={1.7}
                className="cursor-pointer hover:text-[var(--primary-300)]"
                onClick={handleSearch}
              />
            )}
          </>
        )}

        {/* 프로필 이미지 이상하면 여기 확인하기 */}
        <div className="size-[40px]">
          <Image
            width={100}
            height={100}
            src={profileImage}
            alt="User Profile"
            className="size-[40px] rounded-full object-cover cursor-pointer border border-[var(--gray-100)] hover:ring-2 hover:ring-[var(--primary-300)]"
            onClick={() => setIsUserModalOpen((prev) => !prev)}
          />
        </div>
      </div>

      {/* 알림 모달 */}
      {!isAdmin && isNotiOpen && (
        <div ref={notiRef} className="absolute top-[72px] right-[80px] z-50">
          <Notification onClose={() => setIsNotiOpen(false)} />
        </div>
      )}

      {/* 검색 모달 */}
      {!isAdmin && isSearchOpen && (
        <div
          ref={searchRef}
          className="absolute top-[80px] left-0 w-full bg-[var(--white)] shadow-md z-50"
        >
          <SearchModal onClose={() => setIsSearchOpen(false)} />
        </div>
      )}

      {/* 유저프로필 모달 */}
      {isUserModalOpen && (
        <div ref={userRef} className="absolute top-[72px] right-[38px] z-50">
          <UserModal
            onClose={() => setIsUserModalOpen(false)}
            isAdmin={isAdmin}
          />
        </div>
      )}
    </header>
  );
}
