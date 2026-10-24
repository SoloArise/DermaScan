import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { validateImageFile } from '../../lib/validation';
import { Button } from '../ui/Button';

export interface ImageUploaderProps {
  onFileSelected: (file: File) => void;
  errorMessage?: string | null;
  onErrorChange?: (error: string | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onFileSelected,
  errorMessage,
  onErrorChange,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | null) => {
    if (!file) return;
    const validation = validateImageFile(file);
    if (!validation.valid) {
      if (onErrorChange) onErrorChange(validation.error || 'Invalid file');
      return;
    }
    if (onErrorChange) onErrorChange(null);
    onFileSelected(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const triggerBrowse = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        id="lesion-image-input"
        accept="image/jpeg, image/png, image/jpg"
        onChange={handleInputChange}
        className="sr-only"
        aria-label="Upload dermoscopic skin lesion image"
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerBrowse}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            triggerBrowse();
          }
        }}
        tabIndex={0}
        role="button"
        aria-describedby="upload-instructions"
        className={`relative border-2 border-dashed rounded-card-lg p-8 md:p-12 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center min-h-[260px] ${
          isDragOver
            ? 'border-primary bg-primary-light/40 scale-[1.01]'
            : 'border-slate-300 hover:border-primary/60 bg-white hover:bg-slate-50/50'
        } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
      >
        <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center text-primary mb-4 transition-transform group-hover:scale-105">
          <UploadCloud className="w-8 h-8" />
        </div>

        <h4 className="text-base font-semibold text-content-main mb-1">
          Drag and drop your dermoscopic image here
        </h4>
        <p className="text-sm text-content-secondary max-w-sm mb-4" id="upload-instructions">
          Supports JPEG, JPG, and PNG files up to 10MB in size.
        </p>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            triggerBrowse();
          }}
          leftIcon={<ImageIcon className="w-4 h-4" />}
        >
          Browse Files
        </Button>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="mt-3 flex items-center gap-2 text-xs font-medium text-med-error bg-red-50 p-2.5 rounded-lg border border-red-200 animate-in fade-in"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
