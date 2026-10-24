import React, { useEffect, useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { ScanHistoryList } from '../components/history/ScanHistoryList';
import { Spinner } from '../components/ui/Spinner';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { fetchScanHistory, deleteScanRecord } from '../services/scanService';
import type { ScanHistorySummary } from '../types/scan';
import { History, PlusCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HistoryPage: React.FC = () => {
  const [scans, setScans] = useState<ScanHistorySummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadHistory = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await fetchScanHistory();
      setScans(data);
    } catch (err: any) {
      setErrorMessage(
        err.message || 'Unable to connect to the backend server to load scan history.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDeleteScan = async (scanId: string) => {
    await deleteScanRecord(scanId);
    setScans((prev) => prev.filter((s) => s.scan_id !== scanId));
  };

  return (
    <PageContainer>
      {/* Page Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-med-border">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold mb-2">
            <History className="w-3.5 h-3.5" />
            <span>Session Logs</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">
            Scan History
          </h1>
          <p className="text-sm text-content-secondary mt-1">
            Review previous dermoscopic screenings recorded during this research session.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadHistory}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Refresh
          </Button>
          <Link to="/scan">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<PlusCircle className="w-4 h-4" />}
            >
              New Scan
            </Button>
          </Link>
        </div>
      </div>

      {/* Privacy Notice Alert */}
      <div className="mb-6">
        <Alert variant="info" title="Session Storage & Medical Records Notice">
          Scan history is stored on the local backend instance for academic testing. It is not an encrypted Electronic Health Record (EHR) system. Do not rely on this session history for permanent medical archiving.
        </Alert>
      </div>

      {/* Loading, Error, or List Content */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-3">
          <Spinner size="lg" />
          <p className="text-sm text-content-secondary">Loading recorded scans...</p>
        </div>
      ) : errorMessage ? (
        <div className="space-y-4">
          <Alert variant="error" title="Could Not Retrieve History">
            {errorMessage}
          </Alert>
          <div className="text-center pt-2">
            <Button variant="outline" size="sm" onClick={loadHistory}>
              Retry Connection
            </Button>
          </div>
        </div>
      ) : (
        <ScanHistoryList scans={scans} onDeleteScan={handleDeleteScan} />
      )}
    </PageContainer>
  );
};
