'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '@/libs/axios';
import ManageCard from './card/ManageCard';
import ManageCardFormCard from './card/ManageCardFormCard';
import ManageAddCard from './card/ManageAddCard';
import { CustomMarker } from '@/types/admin';
import ManageCardSkeleton from './skeleton/ManageCardSkeleton';
import { toast } from 'react-toastify';
import ConfirmModal from '../common/modal/ConfirmModal';

export default function MarkerManage({
  setCount,
}: {
  setCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [markers, setMarkers] = useState<CustomMarker[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newMarker, setNewMarker] = useState<{
    name: string;
    image: File | null;
  }>({
    name: '',
    image: null,
  });
  const [editedMarker, setEditedMarker] = useState<{
    name: string;
    image: File | null;
  }>({
    name: '',
    image: null,
  });
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get<{
          markerCustomImages: CustomMarker[];
        }>('/markers/customImages');
        setMarkers(res.data.markerCustomImages);
        setCount(res.data.markerCustomImages.length);
      } catch (err) {
        console.error('마커 이미지 목록 불러오기 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkers();
  }, [setCount]);

  const handleSubmit = async () => {
    if (!newMarker.name.trim()) {
      toast.error('마커 이름을 입력하세요');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', newMarker.name);
      if (newMarker.image) formData.append('imageFile', newMarker.image);

      const res = await axiosInstance.post('/markers/customImage', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const imageUrl =
        res.data.markerImage ||
        (newMarker.image && URL.createObjectURL(newMarker.image));

      const addedMarker = {
        ...res.data,
        name: res.data.name || newMarker.name,
        markerImage: imageUrl,
      };

      setMarkers((prev) => [...prev, addedMarker]);
      setCount(markers.length + 1);
      setNewMarker({ name: '', image: null });
      setShowForm(false);
      toast.success('마커가 성공적으로 추가되었습니다.');
    } catch (err) {
      console.error('마커 추가 실패:', err);
      toast.error('마커 추가 중 오류 발생');
    }
  };

  const handleEditSubmit = async (id: number) => {
    try {
      const formData = new FormData();
      if (editedMarker.image) {
        formData.append('imageFile', editedMarker.image);
      }

      const params = new URLSearchParams();
      params.append('name', editedMarker.name);

      const res = await axiosInstance.put(
        `/markers/customImage/${id}?${params}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const updated = {
        ...res.data,
        name: res.data.name || editedMarker.name,
        markerImage:
          res.data.markerImage ||
          (editedMarker.image && URL.createObjectURL(editedMarker.image)) ||
          markers.find((m) => m.id === id)?.markerImage ||
          '',
      };

      setMarkers((prev) =>
        prev.map((m) => (m.id === id ? { ...m, ...updated } : m))
      );
      setEditingId(null);
      setEditedMarker({ name: '', image: null });
      toast.success('마커 수정 완료');
    } catch (err) {
      console.error('마커 수정 실패:', err);
      toast.error('마커 수정 중 오류 발생');
    }
  };

  const handleDelete = (id: number) => {
    setDeleteTargetId(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteTargetId === null) return;

    try {
      await axiosInstance.delete(`/markers/customImage/${deleteTargetId}`);
      setMarkers((prev) => prev.filter((m) => m.id !== deleteTargetId));
      setCount((prev) => prev - 1);
      toast.success('마커 삭제 완료');
    } catch (err) {
      console.error('마커 삭제 실패:', err);
      toast.error('마커 삭제 중 오류 발생');
    } finally {
      setIsConfirmOpen(false);
      setDeleteTargetId(null);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setNewMarker((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setEditedMarker((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  return (
    <div className="w-[732px] mx-auto border border-[var(--gray-50)] rounded-[10px] px-[16px] py-[16px]">
      <div className="flex flex-wrap gap-[16px]">
        {isLoading ? (
          Array.from({ length: 1 }).map((_, idx) => (
            <ManageCardSkeleton key={idx} />
          ))
        ) : (
          <>
            {markers.map((marker) =>
              editingId === marker.id ? (
                <ManageCardFormCard
                  key={`edit-${marker.id}`}
                  name={editedMarker.name}
                  image={editedMarker.image}
                  onNameChange={(name) =>
                    setEditedMarker((prev) => ({ ...prev, name }))
                  }
                  onImageChange={handleEditImageChange}
                  onSubmit={() => handleEditSubmit(marker.id)}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <ManageCard
                  key={`view-${marker.id}`}
                  id={marker.id}
                  name={marker.name}
                  image={marker.markerImage}
                  item={marker}
                  onEditClick={(marker) => {
                    setEditingId(marker.id);
                    setEditedMarker({ name: marker.name, image: null });
                  }}
                  onDelete={(marker) => handleDelete(marker.id)}
                />
              )
            )}

            {showForm ? (
              <ManageCardFormCard
                key="new-marker-form"
                name={newMarker.name}
                image={newMarker.image}
                onNameChange={(name) =>
                  setNewMarker((prev) => ({ ...prev, name }))
                }
                onImageChange={handleImageChange}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setNewMarker({ name: '', image: null });
                }}
              />
            ) : (
              <ManageAddCard
                key="marker-add-button"
                type="marker"
                onClick={() => setShowForm(true)}
              />
            )}
          </>
        )}
        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onDelete={handleConfirmDelete}
          confirmType="marker"
        />
      </div>
    </div>
  );
}
