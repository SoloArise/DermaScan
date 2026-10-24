import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside aria-label="Medical Disclaimer" className="bg-amber-500/10 border-b border-amber-500/20 text-amber-950 px-4 py-2 text-xs md:text-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" aria-hidden="true" />
          <p className="leading-tight">
            <strong className="font-semibold">Academic Screening Tool:</strong> DermaScan is an educational AI research prototype. It does not provide medical diagnosis or replace a clinical skin examination by a qualified dermatologist.
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-amber-800 hover:text-amber-950 p-1 rounded hover:bg-amber-500/20 shrink-0 transition-colors"
          aria-label="Dismiss disclaimer banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
