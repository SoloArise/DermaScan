import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { ScanHistorySummary } from '../../types/scan';
import { formatDate, formatPercentage, getSeverityBadgeConfig } from '../../lib/utils';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { ExternalLink, Trash2, Calendar, FileText, AlertTriangle } from 'lucide-react';

export interface ScanHistoryItemProps {
  item: ScanHistorySummary;
  onDelete: (scanId: string) => Promise<void>;
}

export const ScanHistoryItem: React.FC<ScanHistoryItemProps> = ({
  item,
  onDelete,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const badgeConfig = getSeverityBadgeConfig(item.severity_hint);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(item.scan_id);
      setShowConfirmModal(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-med-border p-4 shadow-subtle hover:shadow-card transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left: Thumbnail & Main Info */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200 flex items-center justify-center">
            {item.thumbnail_url ? (
              <img
                src={item.thumbnail_url}
                alt={item.filename}
                className="w-full h-full object-cover"
              />
            ) : (
              <FileText className="w-6 h-6 text-slate-400" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${badgeConfig.badgeClass}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${badgeConfig.dotClass}`} />
                {item.class_code.toUpperCase()}
              </span>
              {item.is_simulated && (
                <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-medium">
                  Simulated
                </span>
              )}
            </div>

            <h4 className="text-base font-semibold text-content-main truncate">
              {item.class_name}
            </h4>

            <div className="flex items-center gap-3 text-xs text-content-secondary mt-0.5 flex-wrap">
              <span className="truncate max-w-[140px]">{item.filename}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(item.created_at)}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Confidence & Actions */}
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-med-border">
          <div className="text-left sm:text-right">
            <span className="text-[11px] text-content-secondary block">
              Confidence
            </span>
            <span className="text-sm font-bold text-primary font-mono">
              {formatPercentage(item.confidence)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link to={`/results/${item.scan_id}`}>
              <Button
                variant="outline"
                size="sm"
                rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
              >
                View
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowConfirmModal(true)}
              className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-2"
              aria-label="Delete scan record"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Delete Scan Record"
        description="Are you sure you want to permanently delete this scan record from your history?"
      >
        <div className="space-y-4 pt-2">
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>
              This will remove the scan report (ID: {item.scan_id}) and any cached thumbnail from this browser session.
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowConfirmModal(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleDelete}
              isLoading={isDeleting}
            >
              Delete Record
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
