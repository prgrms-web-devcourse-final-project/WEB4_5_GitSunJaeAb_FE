'use client';

import { useEffect, useState } from 'react';
import { Category } from '@/types/admin';
import axiosInstance from '@/libs/axios';
import ManageCard from './card/ManageCard';
import ManageCardFormCard from './card/ManageCardFormCard';
import ManageAddCard from './card/ManageAddCard';
import ManageCardModal from './modal/ManageCardModal';
import ManageCardSkeleton from './skeleton/ManageCardSkeleton';
import { toast } from 'react-toastify';
import ConfirmModal from '../common/modal/ConfirmModal';

export default function CategoryManage({
  setCount,
}: {
  setCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editedCategory, setEditedCategory] = useState<{
    name: string;
    image: File | null;
  }>({ name: '', image: null });
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get('/categories');
        setCategories(res.data.categories);
        setCount(res.data.categories.length);
      } catch (error) {
        console.error('카테고리 불러오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, [setCount]);

  const handleSubmit = async ({
    name,
    image,
    description,
  }: {
    name: string;
    image: File | null;
    description: string;
  }) => {
    if (!name.trim()) {
      toast.error('카테고리 이름을 입력하세요');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description || '');
      if (image) {
        formData.append('imageFile', image);
      }

      const res = await axiosInstance.post('/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageUrl =
        res.data.categoryImage || (image && URL.createObjectURL(image));

      const addedCategory = {
        ...res.data,
        name: res.data.name || name,
        description: res.data.description || description,
        categoryImage: imageUrl,
      };

      setCategories((prev) => [...prev, addedCategory]);
      setShowForm(false);
      setCount(categories.length + 1);
      toast.success('카테고리가 성공적으로 추가되었습니다.');
    } catch (error) {
      console.error('POST 요청 실패:', error);
      toast.error('카테고리 추가 중 오류가 발생했습니다.');
    }
  };

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setEditedCategory((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleEditSubmit = async (id: number) => {
    try {
      const formData = new FormData();
      if (editedCategory.image) {
        formData.append('imageFile', editedCategory.image);
      }

      const existingDescription =
        categories.find((cat) => cat.id === id)?.description || '';

      const params = new URLSearchParams();
      params.append('name', editedCategory.name);
      params.append('description', existingDescription);

      const res = await axiosInstance.put(
        `/categories/${id}?${params.toString()}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const updatedCategory = res.data;
      const imageUrl =
        updatedCategory.categoryImage ||
        (editedCategory.image && URL.createObjectURL(editedCategory.image)) ||
        categories.find((cat) => cat.id === id)?.categoryImage ||
        '';

      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === id
            ? {
                ...cat,
                ...updatedCategory,
                name: updatedCategory.name || editedCategory.name,
                description: existingDescription,
                categoryImage: imageUrl,
              }
            : cat
        )
      );

      setEditingId(null);
      setEditedCategory({ name: '', image: null });
      toast.success('카테고리 수정이 완료되었습니다.');
    } catch (err) {
      console.error('카테고리 수정 실패:', err);
      toast.error('카테고리 수정 중 오류가 발생했습니다.');
    }
  };

  const handleModalEditSubmit = async ({
    id,
    name,
    image,
    description,
  }: {
    id: number;
    name: string;
    image: File | null;
    description: string;
  }) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      if (image) {
        formData.append('imageFile', image);
      }

      const res = await axiosInstance.put(`/categories/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const updated = res.data;
      const imageUrl =
        updated.categoryImage ||
        (image && URL.createObjectURL(image)) ||
        categories.find((c) => c.id === id)?.categoryImage ||
        '';

      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === id
            ? {
                ...cat,
                name: updated.name || name,
                description: updated.description || description,
                categoryImage: imageUrl,
              }
            : cat
        )
      );

      toast.success('카테고리 수정 완료!');
    } catch (err) {
      console.error(err);
      toast.error('카테고리 수정 실패');
    }
  };

  const handleDeleteCategory = async (id: number) => {
    setDeleteTargetId(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteTargetId === null) return;

    try {
      await axiosInstance.delete(`/categories/${deleteTargetId}`);
      setCategories((prev) => prev.filter((cat) => cat.id !== deleteTargetId));
      setCount((prev) => prev - 1);
      toast.success('카테고리가 삭제되었습니다.');
    } catch (error) {
      console.error('카테고리 삭제 실패:', error);
      toast.error('카테고리 삭제 중 오류가 발생했습니다.');
    } finally {
      setDeleteTargetId(null);
      setIsConfirmOpen(false);
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
            {categories.map((category) =>
              editingId === category.id ? (
                <ManageCardFormCard
                  key={`edit-${category.id}`}
                  name={editedCategory.name}
                  image={editedCategory.image}
                  onNameChange={(name) =>
                    setEditedCategory((prev) => ({ ...prev, name }))
                  }
                  onImageChange={handleEditImageChange}
                  onSubmit={() => handleEditSubmit(category.id)}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <ManageCard
                  key={`view-${category.id}`}
                  name={category.name}
                  image={category.categoryImage}
                  item={category}
                  description={category.description}
                  onEditClick={(cat) => {
                    setEditingId(cat.id);
                    setEditedCategory({ name: cat.name, image: null });
                  }}
                  onEditSubmit={handleModalEditSubmit}
                  onDelete={() => handleDeleteCategory(category.id)}
                  type="category"
                />
              )
            )}

            {showForm && (
              <ManageCardModal
                name=""
                image=""
                description=""
                item={{ id: 0 }}
                onClose={() => setShowForm(false)}
                onEditSubmit={({ name, image, description }) =>
                  handleSubmit({ name, image, description })
                }
              />
            )}

            <ManageAddCard
              key="category-add-button"
              type="category"
              onClick={() => setShowForm(true)}
            />
          </>
        )}
        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onDelete={handleConfirmDelete}
          confirmType="category"
        />
      </div>
    </div>
  );
}
