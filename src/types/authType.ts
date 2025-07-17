export type User = {
  id: number;
  name: string;
  nickname: string;
  email: string;
  loginType: string;
  role: string;
  profileImage?: string | null;
  createdAt: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
};

export type SignupFormData = {
  name: string;
  nickname: string;
  email: string;
  password: string;
};

export type AuthState = {
  accessToken: string | null;
  user: User | null;
  loading: boolean;
  setAccessToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  initUser: () => Promise<void>;
  isLoggedIn: () => boolean;
};
