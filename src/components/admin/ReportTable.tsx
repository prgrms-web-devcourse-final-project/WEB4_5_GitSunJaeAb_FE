'use client';

import { useState, useEffect } from 'react';
import { Siren } from 'lucide-react';
import { DisplayReport, Report, ReportResponse } from '@/types/admin';
import ReportDetailModal from './ReportDetailModal';

const TABS = ['전체', '대기중', '완료'];

export default function ReportTable() {
  const [selectedTab, setSelectedTab] = useState('전체');
  const [reports, setReports] = useState<DisplayReport[]>([]);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [selectedReport, setSelectedReport] = useState<{
    id: number;
    contentType: '지도' | '퀘스트';
  } | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}reports`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('서버 응답 실패');
        }
        return res.json();
      })
      .then((data: ReportResponse) => {
        if (!Array.isArray(data.reports)) {
          console.warn('서버에서 reports 배열이 안 옴:', data);
          setReports([]);
          return;
        }

        const getContentType = (report: Report): '지도' | '퀘스트' => {
          if (report.quest !== null) return '퀘스트';
          if (report.roadmap !== null || report.marker !== null) return '지도';
          return '지도';
        };

        const mapped: DisplayReport[] = data.reports.map((report: Report) => ({
          id: report.id,
          reported: report.reportedMember.nickname,
          reporter: report.reporter.nickname,
          type: report.description,
          date: new Date(report.createdAt).toLocaleDateString('ko-KR'),
          status: report.status === 'RESOLVED' ? '완료' : '대기',
          contentType: getContentType(report),
          roadmap: report.roadmap,
          marker: report.marker,
          quest: report.quest,
        }));

        setReports(mapped);
      })
      .catch((err) => console.error('신고 목록 불러오기 실패:', err));
  }, [API_BASE_URL]);

  const filteredReports =
    selectedTab === '전체'
      ? reports
      : selectedTab === '대기중'
      ? reports.filter((r) => r.status === '대기')
      : reports.filter((r) => r.status === '완료');

  const handleDelete = async (report: DisplayReport) => {
    const { contentType, roadmap, quest } = report;
    let deleteUrl = '';

    if (contentType === '지도' && roadmap !== null) {
      deleteUrl = `${API_BASE_URL}roadmaps/${roadmap}`;
    } else if (contentType === '퀘스트' && quest !== null) {
      deleteUrl = `${API_BASE_URL}quests/${quest}`;
    } else {
      alert('삭제할 게시글 ID가 없습니다.');
      return;
    }

    const confirmDelete = confirm('정말 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(deleteUrl, { method: 'DELETE' });
      if (!res.ok) throw new Error('삭제 실패');

      alert('게시글이 삭제되었습니다.');
      // 삭제 후 리스트 갱신 (서버에서 실제 삭제되었을 때만)
      setReports((prev) => prev.filter((r) => r.id !== report.id));
    } catch (err) {
      console.error(err);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="w-[1000px] bg-[var(--white)] rounded-lg p-4 flex flex-col justify-start border border-[var(--gray-50)]">
      <div className="flex items-center gap-[16px] font-semibold text-[var(--primary-300)] mb-[20px]">
        <Siren className="w-[20px] h-[20px]" />
        <span className="text-lg">신고 내역</span>
      </div>

      <div className="flex gap-[26px] mb-4 text-[15px] font-medium">
        {TABS.map((tab) => (
          <span
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`cursor-pointer pb-1 ${
              selectedTab === tab
                ? 'text-[var(--primary-300)] border-b-2 border-[var(--primary-300)]'
                : 'text-[var(--gray-300)]'
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* 테이블 */}
      <div>
        <table className="w-full text-left text-[14px]">
          <thead>
            <tr className="text-[var(--black)] border-b border-[var(--gray-50)]">
              <th className="py-2">피신고자</th>
              <th className="py-2">신고자</th>
              <th className="py-2">유형</th>
              <th className="py-2">날짜</th>
              <th className="py-2 pl-2">상태</th>
              <th className="py-2 pl-3">조치</th>
              <th className="py-2">종류</th>
              <th className="text-center py-2">게시글 삭제</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-[var(--gray-300)]"
                >
                  해당하는 신고 내역이 없습니다.
                </td>
              </tr>
            ) : (
              filteredReports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b border-[var(--gray-50)]"
                >
                  <td className="py-2">{report.reported}</td>
                  <td>{report.reporter}</td>
                  <td>{report.type}</td>
                  <td>{report.date}</td>
                  <td className="text-left align-middle pr-[12px]">
                    <span
                      className={`inline-block px-[10px] rounded-full text-[13px] ${
                        report.status === '대기'
                          ? 'bg-[#FFF4F4] text-[var(--red)]'
                          : 'bg-[#F4FFF4] text-[var(--primary-200)]'
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="text-[var(--blue)]">
                    <span
                      className="mr-2 cursor-pointer"
                      onClick={() =>
                        setSelectedReport({
                          id: report.id,
                          contentType: report.contentType,
                        })
                      }
                    >
                      상세 보기
                    </span>
                  </td>

                  <td className="py-2 align-top text-[13px] text-[var(--gray-700)]">
                    <div>{report.contentType}</div>
                  </td>

                  <td className="py-2 align-top text-[13px] text-center text-[var(--red)]">
                    <button
                      className="underline cursor-pointer"
                      onClick={() => handleDelete(report)}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <ReportDetailModal
          isOpen={selectedReport !== null}
          onClose={() => setSelectedReport(null)}
          reportId={selectedReport?.id ?? null}
          contentType={selectedReport?.contentType ?? null}
        />
      </div>
    </div>
  );
}
