import React, { useState } from 'react';
import type { ScanHistorySummary } from '../../types/scan';
import { ScanHistoryItem } from './ScanHistoryItem';
import { EmptyState } from '../ui/EmptyState';
import { Search, FolderClock } from 'lucide-react';

export interface ScanHistoryListProps {
  scans: ScanHistorySummary[];
  onDeleteScan: (scanId: string) => Promise<void>;
}

export const ScanHistoryList: React.FC<ScanHistoryListProps> = ({
  scans,
  onDeleteScan,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredScans = scans.filter((s) => {
    const q = searchTerm.toLowerCase();
    return (
      s.class_name.toLowerCase().includes(q) ||
      s.filename.toLowerCase().includes(q) ||
      s.class_code.toLowerCase().includes(q) ||
      s.scan_id.toLowerCase().includes(q)
    );
  });

  if (scans.length === 0) {
    return (
      <EmptyState
        icon={<FolderClock className="w-8 h-8" />}
        title="No Previous Scans Found"
        description="You have not uploaded any dermoscopic images for screening yet. Start your first scan now."
        actionText="Start a New Scan"
        onAction={() => {
          window.location.href = '/scan';
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Filter Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-med-border shadow-subtle">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by diagnosis, filename, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-med-border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            aria-label="Search past scans"
          />
        </div>

        <div className="text-xs text-content-secondary shrink-0 w-full sm:w-auto text-right">
          Showing <strong>{filteredScans.length}</strong> of{' '}
          <strong>{scans.length}</strong> recorded scans
        </div>
      </div>

      {/* Scans List */}
      {filteredScans.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-med-border p-6 text-xs text-content-secondary">
          No scans match your search query "{searchTerm}".
        </div>
      ) : (
        <div className="space-y-3">
          {filteredScans.map((scan) => (
            <ScanHistoryItem
              key={scan.scan_id}
              item={scan}
              onDelete={onDeleteScan}
            />
          ))}
        </div>
      )}
    </div>
  );
};
