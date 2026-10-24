import React from 'react';
import { Card } from '../ui/Card';
import { AlertTriangle, Stethoscope } from 'lucide-react';
import type { PredictionDetail } from '../../types/scan';

export interface RecommendationCardProps {
  prediction: PredictionDetail;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  prediction,
}) => {
  const isConcerning =
    prediction.severity_hint === 'urgent_evaluation' ||
    prediction.severity_hint === 'high' ||
    prediction.class_code === 'mel' ||
    prediction.class_code === 'bcc';

  return (
    <Card className="space-y-5">
      <div className="flex items-center gap-2.5 pb-3 border-b border-med-border">
        <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-primary">
          <Stethoscope className="w-5 h-5" />
        </div>
        <h3 className="text-base font-semibold text-navy">
          Recommended Screening Next Steps
        </h3>
      </div>

      {/* Specific guidance */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-navy">
          Next Step Protocol
        </h4>
        <p className="text-sm text-content-main leading-relaxed">
          {prediction.screening_guidance}
        </p>
      </div>

      {/* Cautious statement box */}
      <div
        className={`p-4 rounded-xl border text-xs leading-relaxed flex items-start gap-3 ${
          isConcerning
            ? 'bg-amber-50 border-amber-200 text-amber-950'
            : 'bg-teal-50/70 border-teal-200 text-teal-950'
        }`}
      >
        <AlertTriangle
          className={`w-5 h-5 shrink-0 mt-0.5 ${
            isConcerning ? 'text-amber-600' : 'text-primary'
          }`}
        />
        <div>
          <span className="font-semibold block mb-0.5">
            Essential Screening Guidance
          </span>
          This result is an AI-assisted screening output and cannot confirm or exclude skin cancer. Even if a prediction is classified as benign, self-monitoring is essential. Consult a qualified dermatologist for comprehensive clinical examination if you notice any changing skin lesion.
        </div>
      </div>

      {/* ABCDE Rule Reference */}
      <div className="pt-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-content-secondary mb-3">
          Clinical Reference: The ABCDE Skin Rule
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-surface-soft border border-med-border">
            <strong className="text-primary font-bold">A</strong> — <strong>Asymmetry:</strong> One half does not match the other half.
          </div>
          <div className="p-2.5 rounded-lg bg-surface-soft border border-med-border">
            <strong className="text-primary font-bold">B</strong> — <strong>Border:</strong> Edges are irregular, ragged, notched, or blurred.
          </div>
          <div className="p-2.5 rounded-lg bg-surface-soft border border-med-border">
            <strong className="text-primary font-bold">C</strong> — <strong>Color:</strong> Pigmentation is not uniform across the surface.
          </div>
          <div className="p-2.5 rounded-lg bg-surface-soft border border-med-border">
            <strong className="text-primary font-bold">D</strong> — <strong>Diameter:</strong> Lesion is greater than 6mm (pencil eraser size).
          </div>
          <div className="sm:col-span-2 p-2.5 rounded-lg bg-surface-soft border border-med-border">
            <strong className="text-primary font-bold">E</strong> — <strong>Evolving:</strong> The mole changes in size, shape, elevation, or starts itching/bleeding.
          </div>
        </div>
      </div>
    </Card>
  );
};
