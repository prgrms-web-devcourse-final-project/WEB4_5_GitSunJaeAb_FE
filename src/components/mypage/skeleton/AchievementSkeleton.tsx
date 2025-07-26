export default function AchievementSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center p-5 rounded-xl border bg-white border-[var(--gray-100)] animate-pulse">
      <div className="w-24 h-24 rounded-full bg-[var(--gray-100)] mb-3" />
      <div className="w-20 h-4 bg-[var(--gray-100)] rounded" />
    </div>
  );
}
