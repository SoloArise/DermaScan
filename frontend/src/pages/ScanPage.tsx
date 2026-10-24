import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ImageUploader } from '../components/scan/ImageUploader';
import { ImagePreview } from '../components/scan/ImagePreview';
import { ScanInstructions } from '../components/scan/ScanInstructions';
import { uploadAndAnalyzeImage } from '../services/scanService';
import { ApiError } from '../services/api';
import { AlertCircle, Activity, Sparkles } from 'lucide-react';

export const ScanPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [consentGiven, setConsentGiven] = useState(true);
  const navigate = useNavigate();
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setErrorMessage(null);
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setErrorMessage(null);
  };

  const handleReplace = () => {
    hiddenInputRef.current?.click();
  };

  const handleHiddenInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setErrorMessage('Please select a dermoscopic image file to analyze.');
      return;
    }

    if (!consentGiven) {
      setErrorMessage('Please acknowledge the consent and screening disclaimer to proceed.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      const result = await uploadAndAnalyzeImage(selectedFile);
      navigate(`/results/${result.scan_id}`);
    } catch (err: any) {
      if (err instanceof ApiError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('An unexpected error occurred during image screening. Please try again.');
      }
      setIsAnalyzing(false);
    }
  };

  return (
    <PageContainer>
      {/* Hidden file input for Replace action */}
      <input
        ref={hiddenInputRef}
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        onChange={handleHiddenInputChange}
        className="sr-only"
        aria-hidden="true"
      />

      {/* Page Heading */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold mb-2">
          <Activity className="w-3.5 h-3.5" />
          <span>Screening Portal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">
          Skin Lesion Scanner
        </h1>
        <p className="text-sm sm:text-base text-content-secondary mt-1 max-w-xl">
          Upload a clear dermoscopic image to begin AI-assisted screening and receive classification results.
        </p>
      </div>

      {/* Two-column layout on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Upload & Actions */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-med-border">
              <h2 className="text-base font-semibold text-navy">
                Dermoscopic Image Upload
              </h2>
              <span className="text-xs text-content-secondary">
                JPEG or PNG (Max 10MB)
              </span>
            </div>

            {/* Uploader or Preview */}
            {!selectedFile ? (
              <ImageUploader
                onFileSelected={handleFileSelect}
                errorMessage={errorMessage}
                onErrorChange={(err) => setErrorMessage(err)}
              />
            ) : (
              <div className="space-y-4">
                <ImagePreview
                  file={selectedFile}
                  onRemove={handleRemove}
                  onReplace={handleReplace}
                  isAnalyzing={isAnalyzing}
                />

                {/* Consent checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-content-secondary select-none">
                    <input
                      type="checkbox"
                      checked={consentGiven}
                      onChange={(e) => setConsentGiven(e.target.checked)}
                      disabled={isAnalyzing}
                      className="mt-0.5 rounded border-slate-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                    />
                    <span>
                      I understand that this is an <strong>educational AI screening tool</strong>, not a medical diagnosis. Images may be processed by the local backend service for lesion classification.
                    </span>
                  </label>
                </div>

                {/* General Error Message */}
                {errorMessage && (
                  <div
                    role="alert"
                    className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-med-error text-xs rounded-lg animate-in fade-in"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Analyze Primary CTA Button */}
                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleAnalyze}
                    isLoading={isAnalyzing}
                    disabled={isAnalyzing || !consentGiven}
                    className="w-full justify-center shadow-md text-base py-3"
                    rightIcon={!isAnalyzing && <Sparkles className="w-4 h-4" />}
                  >
                    {isAnalyzing ? 'Analyzing Image...' : 'Analyze Image'}
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Instructions, tips, privacy */}
        <div className="lg:col-span-5">
          <ScanInstructions />
        </div>
      </div>
    </PageContainer>
  );
};
