export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
export const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateImageFile(file: File | null): ValidationResult {
  if (!file) {
    return { valid: false, error: 'Please select an image file to upload.' };
  }

  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();
  const hasValidExtension = ACCEPTED_EXTENSIONS.some((ext) => fileName.endsWith(ext));

  if (!ACCEPTED_IMAGE_TYPES.includes(fileType) && !hasValidExtension) {
    return {
      valid: false,
      error: 'Unsupported file format. Please upload a JPEG or PNG image.',
    };
  }

  if (file.size === 0) {
    return {
      valid: false,
      error: 'The selected file is empty (0 bytes). Please choose a valid dermoscopic photo.',
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File is too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Maximum allowed size is 10 MB.`,
    };
  }

  return { valid: true };
}
