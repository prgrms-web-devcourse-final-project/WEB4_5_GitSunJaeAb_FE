export const setAccessTokenToStore = async (token: string) => {
  if (typeof window !== 'undefined') {
    // localStorage.setItem('accessToken', token);
    const mod = await import('@/store/useAuthStore');
    mod.useAuthStore.getState().setAccessToken(token);
  }
};
