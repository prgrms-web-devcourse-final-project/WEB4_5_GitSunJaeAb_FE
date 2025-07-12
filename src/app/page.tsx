import Link from 'next/link';

export default async function page() {
  return (
    <>
      <div className="flex gap-4">
        <Link href="/landingpage">
          <button>랜딩페이지</button>
        </Link>

        <Link href="/login">
          <button>로그인</button>
        </Link>

        <Link href="/categories">
          <button>카테고리</button>
        </Link>

        <Link href="/dashbord/main">
          <button>메인대시보드</button>
        </Link>

        <Link href="/loadmap/detail/1">
          <button>로드맵 디테일</button>
        </Link>

        <Link href="/sharemap">
          <button>공유지도 디테일</button>
        </Link>

        <Link href="/dashbord/quest/main/1">
          <button>퀘스트 디테일</button>
        </Link>

        <Link href="/admin">
          <button>관리자페이지</button>
        </Link>
      </div>
    </>
  );
}
