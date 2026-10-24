import { describe, it, expect } from 'vitest';
import {
  cn,
  formatFileSize,
  formatPercentage,
  getSeverityBadgeConfig,
} from '../lib/utils';

describe('Utility Functions', () => {
  describe('cn (className merger)', () => {
    it('should join truthful class names and filter falsy ones', () => {
      expect(cn('btn', true && 'btn-primary', false && 'hidden', null, undefined)).toBe(
        'btn btn-primary'
      );
    });
  });

  describe('formatFileSize', () => {
    it('should format bytes properly', () => {
      expect(formatFileSize(0)).toBe('0 Bytes');
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1024 * 1024 * 2.5)).toBe('2.5 MB');
    });
  });

  describe('formatPercentage', () => {
    it('should format decimal 0.779 to 77.9%', () => {
      expect(formatPercentage(0.779)).toBe('77.9%');
    });

    it('should format 0.05 to 5.0%', () => {
      expect(formatPercentage(0.05)).toBe('5.0%');
    });

    it('should handle already-scaled percentages (>1.0)', () => {
      expect(formatPercentage(85.4)).toBe('85.4%');
    });

    it('should handle invalid inputs gracefully', () => {
      expect(formatPercentage(NaN)).toBe('N/A');
    });
  });

  describe('getSeverityBadgeConfig', () => {
    it('should return urgent styling for urgent_evaluation', () => {
      const config = getSeverityBadgeConfig('urgent_evaluation');
      expect(config.label).toBe('Requires Urgent Evaluation');
      expect(config.badgeClass).toContain('text-red-700');
    });

    it('should return warning styling for high', () => {
      const config = getSeverityBadgeConfig('high');
      expect(config.label).toBe('Clinical Review Advised');
      expect(config.badgeClass).toContain('text-amber-800');
    });

    it('should return moderate styling for moderate', () => {
      const config = getSeverityBadgeConfig('moderate');
      expect(config.label).toBe('Dermatological Assessment Suggested');
      expect(config.badgeClass).toContain('text-blue-800');
    });

    it('should return safe styling for low', () => {
      const config = getSeverityBadgeConfig('low');
      expect(config.label).toBe('Low Clinical Concern / Routine Check');
      expect(config.badgeClass).toContain('text-emerald-800');
    });
  });
});
