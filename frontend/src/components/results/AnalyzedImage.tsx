import React from 'react';
import { Card } from '../ui/Card';
import { formatFileSize, formatDate } from '../../lib/utils';
import { ImageIcon, Calendar, FileText, Hash } from 'lucide-react';

export interface AnalyzedImageProps {
  imageDataUrl?: string;
  filename: string;
  fileSizeBytes: number;
  scanId: string;
  createdAt: string;
}

export const AnalyzedImage: React.FC<AnalyzedImageProps> = ({
  imageDataUrl,
  filename,
  fileSizeBytes,
  scanId,
  createdAt,
}) => {
  return (
    <Card className="p-4 space-y-4">
      {/* Image Preview Box */}
      <div className="relative w-full aspect-[4/3] bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center border border-slate-200">
        {imageDataUrl ? (
          <img
            src={imageDataUrl}
            alt={`Analyzed dermoscopic lesion ${filename}`}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
            <ImageIcon className="w-12 h-12" />
            <span className="text-xs">Image preview not available</span>
          </div>
        )}

        {/* Scan ID Badge */}
        <div className="absolute bottom-2.5 left-2.5 bg-navy/80 backdrop-blur-sm text-white text-[11px] font-mono px-2.5 py-1 rounded-md">
          {scanId}
        </div>
      </div>

      {/* Image metadata list */}
      <div className="space-y-2 text-xs border-t border-med-border pt-3">
        <div className="flex items-center justify-between text-content-secondary">
          <span className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            Filename:
          </span>
          <span className="font-medium text-content-main truncate max-w-[180px]" title={filename}>
            {filename}
          </span>
        </div>

        <div className="flex items-center justify-between text-content-secondary">
          <span className="flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5" />
            File Size:
          </span>
          <span className="font-medium text-content-main">
            {formatFileSize(fileSizeBytes)}
          </span>
        </div>

        <div className="flex items-center justify-between text-content-secondary">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Analysis Date:
          </span>
          <span className="font-medium text-content-main">
            {formatDate(createdAt)}
          </span>
        </div>
      </div>
    </Card>
  );
};
