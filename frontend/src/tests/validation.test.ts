import { describe, it, expect } from 'vitest';
import { validateImageFile, MAX_FILE_SIZE_BYTES } from '../lib/validation';

describe('Dermoscopic Image Validation', () => {
  it('should accept valid JPEG images', () => {
    const file = new File(['valid content'], 'lesion_sample.jpg', { type: 'image/jpeg' });
    const result = validateImageFile(file);
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should accept valid PNG images', () => {
    const file = new File(['valid content'], 'lesion_sample.png', { type: 'image/png' });
    const result = validateImageFile(file);
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should reject null or missing files', () => {
    const result = validateImageFile(null);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Please select an image file');
  });

  it('should reject empty files with 0 bytes', () => {
    const file = new File([], 'empty.jpg', { type: 'image/jpeg' });
    const result = validateImageFile(file);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('empty (0 bytes)');
  });

  it('should reject unsupported formats like PDF or GIF', () => {
    const file = new File(['content'], 'document.pdf', { type: 'application/pdf' });
    const result = validateImageFile(file);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Unsupported file format');
  });

  it('should reject files exceeding 10MB limit', () => {
    // Mock oversized file
    const oversizedFile = {
      name: 'large_image.jpg',
      type: 'image/jpeg',
      size: MAX_FILE_SIZE_BYTES + 1024,
    } as unknown as File;

    const result = validateImageFile(oversizedFile);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('File is too large');
  });
});
