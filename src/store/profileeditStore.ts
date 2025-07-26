import { ProfileEditState } from '@/types/myprofile';
import { create } from 'zustand';

export const useProfileEditStore = create<ProfileEditState>((set) => ({
  nickname: '',
  profileImage: null,

  password: '',
  newPassword: '',
  confirmPassword: '',

  selectedCategoryIds: [],
  setSelectedCategoryIds: (ids) => set({ selectedCategoryIds: ids }),

  setNickname: (nickname) => set({ nickname }),
  setProfileImage: (profileImage) => set({ profileImage }),

  setPassword: (v) => set({ password: v }),
  setNewPassword: (v) => set({ newPassword: v }),
  setConfirmPassword: (v) => set({ confirmPassword: v }),

  reset: () =>
    set({
      nickname: '',
      profileImage: null,
      password: '',
      newPassword: '',
      confirmPassword: '',
      selectedCategoryIds: [],
    }),
}));
