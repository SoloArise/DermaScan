import React from 'react';
import { Card } from '../ui/Card';
import type { ProbabilityEntry } from '../../types/scan';
import { formatPercentage } from '../../lib/utils';
import { BarChart3 } from 'lucide-react';

export interface ConfidenceDisplayProps {
  probabilities: ProbabilityEntry[];
  selectedCode?: string;
}

export const ConfidenceDisplay: React.FC<ConfidenceDisplayProps> = ({
  probabilities,
  selectedCode,
}) => {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-med-border">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="text-base font-semibold text-navy">
            Differential Classification Probabilities
          </h3>
        </div>
        <span className="text-xs text-content-secondary">7 HAM10000 Classes</span>
      </div>

      <p className="text-xs text-content-secondary leading-relaxed">
        Softmax probability distribution across benchmark lesion categories.
      </p>

      <div className="space-y-3 pt-1">
        {probabilities.map((item) => {
          const isTop = item.code === selectedCode;
          const percentage = item.probability * 100;

          return (
            <div
              key={item.code}
              className={`p-2.5 rounded-lg border transition-all ${
                isTop
                  ? 'border-primary/50 bg-primary-light/30'
                  : 'border-slate-100 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className={`font-medium ${isTop ? 'text-primary font-semibold' : 'text-content-main'}`}>
                  {item.name}{' '}
                  <span className="text-[10px] text-content-secondary uppercase font-mono">
                    ({item.code})
                  </span>
                </span>
                <span className="font-mono font-semibold text-content-main">
                  {formatPercentage(item.probability)}
                </span>
              </div>

              {/* Bar visualization */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isTop
                      ? 'bg-primary'
                      : item.probability > 0.1
                      ? 'bg-slate-400'
                      : 'bg-slate-300'
                  }`}
                  style={{ width: `${Math.max(2, Math.min(100, percentage))}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
