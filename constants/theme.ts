import { LawnHealthStatus } from '../data/mockData';

export const colors = {
  background: '#FFFFFF',
  screenTint: '#F4FAF6',
  primary: '#A8D5BA',
  primaryDark: '#7FB596',
  secondary: '#FFD6A5',
  starFilled: '#FFD97D',
  starEmpty: '#E6E6E6',
  card: '#F1F8F2',
  text: '#4A5A4C',
  textMuted: '#7C8C7E',
  border: '#DCE7DD',
  badgeUpcomingBg: '#BEE3DB',
  badgeUpcomingText: '#3A6B63',
  badgeCompletedBg: '#E6E6E6',
  badgeCompletedText: '#6B6B6B',
  white: '#FFFFFF',
};

export const lawnHealthDisplay: Record<LawnHealthStatus, { label: string; bg: string; text: string }> = {
  excellent: { label: 'Excellent', bg: '#C9EAD3', text: '#2F6B45' },
  fair: { label: 'Fair', bg: '#FFE9B3', text: '#8A6A1F' },
  'needs-attention': { label: 'Needs Attention', bg: '#FFD1D1', text: '#9B3B3B' },
};
