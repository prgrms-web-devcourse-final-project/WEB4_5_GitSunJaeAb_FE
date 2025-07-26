import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // 테스트용으로 넣은것입니다.
    // 이미지용 supabase url 추가
    domains: [
      'lyrvpfgoxwppqtuuolav.supabase.co',
      'example.com',
      'mapick.cedartodo.uk',
      'cdn.example.com',
      'localhost',
    ],
    // 이미지 테스트용
    remotePatterns: [
      // 이미지 테스트용
      {
        protocol: 'https',
        hostname: 'lyrvpfgoxwppqtuuolav.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'mapick.cedartodo.uk',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
