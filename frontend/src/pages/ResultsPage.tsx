import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { EmptyState } from '../components/ui/EmptyState';
import { PredictionCard } from '../components/results/PredictionCard';
import { ConfidenceDisplay } from '../components/results/ConfidenceDisplay';
import { RecommendationCard } from '../components/results/RecommendationCard';
import { AnalyzedImage } from '../components/results/AnalyzedImage';
import { fetchScanDetails } from '../services/scanService';
import type { ScanResult } from '../types/scan';
import { formatDate } from '../lib/utils';
import {
  ArrowLeft,
  Printer,
  PlusCircle,
  FolderX,
} from 'lucide-react';

export const ResultsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const loadScan = async () => {
      if (!id) {
        setIsLoading(false);
        setErrorMessage('No scan identifier specified.');
        return;
      }

      setIsLoading(true);
      setErrorMessage(null);

      try {
        const data = await fetchScanDetails(id);
        if (isMounted) setScanResult(data);
      } catch (err: any) {
        if (isMounted) {
          setErrorMessage(
            err.message ||
              `Could not retrieve results for scan ID "${id}". It may have expired or been deleted.`
          );
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadScan();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  // Loading State
  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Spinner size="lg" />
          <h3 className="text-lg font-semibold text-navy">Loading Scan Report...</h3>
          <p className="text-sm text-content-secondary">
            Retrieving classification probabilities and metadata.
          </p>
        </div>
      </PageContainer>
    );
  }

  // Error / Missing Result State
  if (errorMessage || !scanResult) {
    return (
      <PageContainer>
        <div className="py-12">
          <EmptyState
            icon={<FolderX className="w-8 h-8 text-amber-600" />}
            title="Scan Result Not Found"
            description={
              errorMessage ||
              'The requested screening record could not be found. Scan sessions are stored locally and may have cleared.'
            }
            actionText="Start a New Scan"
            onAction={() => navigate('/scan')}
          />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Top Navigation & Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-med-border">
        <div>
          <div className="flex items-center gap-2 text-xs text-content-secondary mb-1">
            <Link to="/scan" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Scanner</span>
            </Link>
            <span>/</span>
            <span className="font-mono text-content-main">{scanResult.scan_id}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">
            Screening Results
          </h1>
          <p className="text-xs text-content-secondary mt-0.5">
            Analyzed on {formatDate(scanResult.created_at)}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            leftIcon={<Printer className="w-4 h-4" />}
          >
            Print Report
          </Button>
          <Link to="/scan">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<PlusCircle className="w-4 h-4" />}
            >
              Start New Scan
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Results Layout: 2-column desktop, stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Analyzed Image & Details */}
        <div className="lg:col-span-5 space-y-6">
          <AnalyzedImage
            imageDataUrl={scanResult.image_data_url}
            filename={scanResult.filename}
            fileSizeBytes={scanResult.file_size_bytes}
            scanId={scanResult.scan_id}
            createdAt={scanResult.created_at}
          />

          {/* Differential Probability Table */}
          <ConfidenceDisplay
            probabilities={scanResult.prediction.probabilities}
            selectedCode={scanResult.prediction.class_code}
          />
        </div>

        {/* Right Column: Prediction Card & Next Steps */}
        <div className="lg:col-span-7 space-y-6">
          <PredictionCard
            prediction={scanResult.prediction}
            model={scanResult.model}
          />

          <RecommendationCard prediction={scanResult.prediction} />
        </div>
      </div>
    </PageContainer>
  );
};
