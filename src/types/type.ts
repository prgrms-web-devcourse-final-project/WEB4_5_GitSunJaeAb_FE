import { ReactNode } from 'react';

export type HeaderProps = {
  isAdmin?: boolean;
};

export type CategoryAddCardProps = {
  type?: 'category' | 'marker';
  onClick?: () => void;
};

export type RoadMapCardProps = {
  category: string;
  mapImageUrl: string;
  title: string;
  description: string;
  hashtags: string[];
  profileImgUrl: string;
  author: string;
  viewCount: number;
  shareCount: number;
  className?: string;
};

export type QuestCardProps = {
  isInProgress?: boolean;
  mapImageUrl: string;
  title: string;
  description: string;
  hashtags: string[];
  profileImgUrl: string;
  author: string;
  deadLine: string;
};

export type ShareMapCardProps = {
  isEvent?: boolean;
  title: string;
  mapImageUrl: string;
  participants: number;
  className?: string;
};

export type CardListProps = {
  type?: 'roadmap' | 'sharemap' | 'quest';
};

export type ButtonProps = {
  children: React.ReactNode;
  style?: string | undefined;
  buttonStyle?: 'green' | 'white' | 'withIcon' | 'smGreen';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export type MarkerEditProps = {
  isTextArea?: boolean;
  onDelete: () => void;
};

export type MarkerDetailProps = {
  isTextArea?: boolean;
};

export type LayerEditProps = {
  title: string;
  isTextArea?: boolean;
  defaultOpen?: boolean;
};
export type LayerDetailProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export type ToggleProps = {
  label: '공개' | '경로' | '애니메이션';
  onChange?: (isActive: boolean) => void;
};

export type SearchItemProps = {
  term: string;
  date: string;
  onRemove: () => void;
};

export type SearchRecord = {
  term: string;
  date: string;
};
