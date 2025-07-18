import { ProfileEditState } from '@/types/myprofile';
import { create } from 'zustand';

export const useProfileEditStore = create<ProfileEditState>((set) => ({
  nickname: '',
  profileImage: null,

  currentPassword: '',
  newPassword: '',
  confirmPassword: '',

  setNickname: (nickname) => set({ nickname }),
  setProfileImage: (profileImage) => set({ profileImage }),

  setCurrentPassword: (v) => set({ currentPassword: v }),
  setNewPassword: (v) => set({ newPassword: v }),
  setConfirmPassword: (v) => set({ confirmPassword: v }),

  reset: () =>
    set({
      nickname: '',
      profileImage: null,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }),
}));
