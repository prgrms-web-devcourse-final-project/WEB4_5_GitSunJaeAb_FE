'use client';

import Image from 'next/image';

type BannerProps = {
  title: string;
  subtitle: string;
};

export default function Banner({ title, subtitle }: BannerProps) {
  return (
    <section className="relative w-full h-[460px]">
      <Image
        src="/assets/SharedMap.jpg"
        alt={`${title} 배너`}
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-[#FFFFFF] text-center">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-lg">{subtitle}</p>
      </div>
    </section>
  );
}
