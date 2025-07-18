export type ProfileMember = {
  id: number;
  name?: string;
  email?: string;
  password?: string;
  loginType?: string;
  provider?: string;
  role?: string;
  status?: string;
  nickname: string;
  profileImage: string | null;
  blacklisted?: boolean;
};

export type useProfileStores = {
  member: ProfileMember | null;
  fetchMember: () => Promise<void>;
};

export type RoadmapResponse = {
  id: number;
  title: string;
  thumbnail: string | null;
  roadmapType: 'SHARED' | 'PERSONAL';
  isPublic?: boolean;
  member?: {
    nickname: string;
    profileImage: string | null;
  };
  isLiked?: boolean;
};

export type Layer = {
  id: number;
  name: string;
  title: string;
  member: {
    nickname: string;
  };
  roadmap: number;
};

export type LayerWithTitle = Layer & {
  roadmapTitle?: string;
};

export type MypageCardProps = {
  title: string;
  date: string;
  author?: string;
  profileImgUrl?: string;
  type: '공개' | '비공개' | '퀘스트' | '공유';
  mapImageUrl: string;
  isLiked?: boolean;
};

export type MypagePostProps = {
  activeTab: '작성글' | '참여글' | '좋아요글';
  searchKeyword: string;
};

export type ProfileEditState = {
  nickname: string;
  profileImage: string | null;

  currentPassword: string;
  newPassword: string;
  confirmPassword: string;

  setNickname: (nickname: string) => void;
  setProfileImage: (image: string | null) => void;

  setCurrentPassword: (v: string) => void;
  setNewPassword: (v: string) => void;
  setConfirmPassword: (v: string) => void;

  reset: () => void;
};
