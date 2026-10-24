import type { SeverityHint } from '../types/scan';

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function formatDate(isoString: string): string {
  if (!isoString) return 'Just now';
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return isoString;
  }
}

export function formatPercentage(val: number): string {
  if (typeof val !== 'number' || isNaN(val)) return 'N/A';
  const decimal = val > 1.0 ? val : val * 100;
  return `${decimal.toFixed(1)}%`;
}

export function getSeverityBadgeConfig(severity: SeverityHint): {
  label: string;
  badgeClass: string;
  dotClass: string;
} {
  switch (severity) {
    case 'urgent_evaluation':
      return {
        label: 'Requires Urgent Evaluation',
        badgeClass: 'bg-red-50 text-red-700 border-red-200',
        dotClass: 'bg-red-600',
      };
    case 'high':
      return {
        label: 'Clinical Review Advised',
        badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
        dotClass: 'bg-amber-600',
      };
    case 'moderate':
      return {
        label: 'Dermatological Assessment Suggested',
        badgeClass: 'bg-blue-50 text-blue-800 border-blue-200',
        dotClass: 'bg-blue-600',
      };
    case 'low':
    default:
      return {
        label: 'Low Clinical Concern / Routine Check',
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        dotClass: 'bg-emerald-600',
      };
  }
}
