import React from 'react';
import { Card } from '../ui/Card';
import { AlertTriangle, Cpu } from 'lucide-react';
import type { PredictionDetail, ModelInfo } from '../../types/scan';
import { formatPercentage, getSeverityBadgeConfig } from '../../lib/utils';

export interface PredictionCardProps {
  prediction: PredictionDetail;
  model: ModelInfo;
}

export const PredictionCard: React.FC<PredictionCardProps> = ({ prediction, model }) => {
  const badgeConfig = getSeverityBadgeConfig(prediction.severity_hint);

  return (
    <Card className="space-y-6">
      {/* Simulation Warning Banner (if dev preview) */}
      {model.is_simulated && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-xs text-amber-900 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-amber-950">
              DEVELOPMENT PREVIEW MODE (SIMULATION ONLY)
            </p>
            <p className="leading-relaxed">
              {model.notice ||
                'No trained deep learning weights (.keras / .h5) were found in backend/models. This output is generated for interface testing and must not be used for medical decisions.'}
            </p>
          </div>
        </div>
      )}

      {/* Main Prediction Header */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-content-secondary">
            Primary Predicted Classification
          </span>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeConfig.badgeClass}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${badgeConfig.dotClass}`} />
            {badgeConfig.label}
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-navy tracking-tight">
          {prediction.class_name}
        </h2>
        <p className="text-sm text-content-secondary mt-1">
          HAM10000 Category: <span className="font-medium text-content-main">{prediction.category}</span> ({prediction.class_code})
        </p>
      </div>

      {/* Confidence Score Pill & Progress Bar */}
      <div className="p-4 rounded-xl bg-surface-soft border border-med-border space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-content-main">
            Model Confidence
          </span>
          <span className="text-xl font-bold text-primary font-mono">
            {formatPercentage(prediction.confidence)}
          </span>
        </div>

        {/* Bar */}
        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${Math.min(100, Math.max(5, prediction.confidence * 100))}%` }}
          />
        </div>

        <p className="text-[11px] text-content-secondary leading-normal">
          Model confidence reflects algorithm certainty given the training distribution, not the clinical probability of malignancy.
        </p>
      </div>

      {/* Lesion Summary Description */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-navy">
          Clinical Summary & Characteristics
        </h4>
        <p className="text-sm text-content-main leading-relaxed bg-slate-50/80 p-3.5 rounded-lg border border-slate-100">
          {prediction.description}
        </p>
      </div>

      {/* Model & Architecture Metadata */}
      <div className="pt-4 border-t border-med-border flex flex-wrap items-center justify-between gap-2 text-xs text-content-secondary">
        <div className="flex items-center gap-1.5">
          <Cpu className="w-4 h-4 text-primary" />
          <span>Model: <strong>{model.name}</strong> (v{model.version})</span>
        </div>
        <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-mono">
          {model.architecture}
        </span>
      </div>
    </Card>
  );
};
