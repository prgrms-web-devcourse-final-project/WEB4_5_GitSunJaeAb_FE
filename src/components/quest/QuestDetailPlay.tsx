'use client';
import { useState } from 'react';
import QuestPlayList from './QuestPlayList';
import QuestPlayView from './QuestPlayView';
import QuestPlayForm from './QuestPlayForm';
import { SubmissionInfo } from '@/types/type';
import axiosInstance from '@/libs/axios';
import { useParams } from 'next/navigation';
import { mergeSubmissionWithId } from '@/libs/mergeSubmission';
import { MemberQuest, SubmissionRaw } from '@/types/quest';

export default function QuestDetailPlay({
  submissionInfo,
  questAuthorId,
}: {
  submissionInfo: SubmissionInfo[];
  questAuthorId: number;
}) {
  const [submissions, setSubmissions] = useState(submissionInfo);

  // 퀘스트리스트 -> 상세
  const [selectedSubmission, setSelectedSubmission] =
    useState<SubmissionInfo | null>(null);

  // 참여하기폼열기
  const [isFormOpen, setIsFormOpen] = useState(false);

  // 판정 후 submission 갱신
  const updateRecognizedStatus = (id: number, isRecognized: boolean) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isRecognized } : s))
    );
  };

  const params = useParams();
  const questId = params?.id as string;

  const handleNewSubmission = async () => {
    try {
      const [detailRes, memberQuestRes] = await Promise.all([
        axiosInstance.get(`/quests/${questId}/detail`),
        axiosInstance.get(`/quests/${questId}/memberQuest`),
      ]);

      const rawSubmissions: SubmissionRaw[] = detailRes.data.submission;
      const memberQuests: MemberQuest[] = memberQuestRes.data.memberQuests;

      const submissionWithId = mergeSubmissionWithId(
        rawSubmissions,
        memberQuests
      );

      setSubmissions(submissionWithId);
      setIsFormOpen(false);
    } catch (err) {
      console.error('새 제출 후 데이터 갱신 실패', err);
    }
  };

  return (
    <>
      {selectedSubmission ? (
        <QuestPlayView
          questAuthorId={questAuthorId}
          submission={selectedSubmission}
          onBack={() => setSelectedSubmission(null)}
          onJudge={updateRecognizedStatus}
        />
      ) : isFormOpen ? (
        <QuestPlayForm onBack={handleNewSubmission} />
      ) : (
        <QuestPlayList
          submission={submissions}
          onSelect={(submission) => setSelectedSubmission(submission)}
          onFormOpen={() => setIsFormOpen(true)}
        />
      )}
    </>
  );
}
