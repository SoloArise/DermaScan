import React, { useEffect, useState } from 'react';
import { formatFileSize } from '../../lib/utils';
import { Button } from '../ui/Button';
import { Trash2, RefreshCw, FileText } from 'lucide-react';

export interface ImagePreviewProps {
  file: File;
  onRemove: () => void;
  onReplace: () => void;
  isAnalyzing?: boolean;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  file,
  onRemove,
  onReplace,
  isAnalyzing = false,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return (
    <div className="w-full bg-white rounded-card-lg border border-med-border p-4 shadow-subtle animate-in fade-in duration-200">
      {/* Image Preview Container */}
      <div className="relative w-full aspect-[4/3] max-h-[380px] bg-slate-900/5 rounded-xl overflow-hidden flex items-center justify-center border border-slate-100">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Selected dermoscopic skin lesion"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="flex items-center justify-center text-slate-400">
            <FileText className="w-12 h-12" />
          </div>
        )}

        {/* Badge indicating ready state */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm border border-slate-200">
          Ready for Analysis
        </div>
      </div>

      {/* File details & Controls */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-med-border">
        <div className="truncate">
          <p className="text-sm font-medium text-content-main truncate" title={file.name}>
            {file.name}
          </p>
          <p className="text-xs text-content-secondary mt-0.5">
            {formatFileSize(file.size)} • {file.type || 'Image'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onReplace}
            disabled={isAnalyzing}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Replace
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            disabled={isAnalyzing}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            leftIcon={<Trash2 className="w-3.5 h-3.5" />}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};
