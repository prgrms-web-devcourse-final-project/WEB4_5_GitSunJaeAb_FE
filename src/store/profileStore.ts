import { useProfileStores } from '@/types/myprofile';
import { create } from 'zustand';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useProfileStore = create<useProfileStores>((set) => ({
  member: null,

  fetchMember: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}members`);
      const data = await res.json();
      set({ member: data.member });
    } catch (err) {
      console.error('프로필 불러오기 실패:', err);
    }
  },
}));
