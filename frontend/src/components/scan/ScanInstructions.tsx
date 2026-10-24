import React from 'react';
import { Card } from '../ui/Card';
import { CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

export const ScanInstructions: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Image Quality Guide */}
      <Card>
        <div className="flex items-center gap-2.5 mb-3 text-navy">
          <HelpCircle className="w-5 h-5 text-primary shrink-0" />
          <h3 className="text-base font-semibold">Image Capture Guidelines</h3>
        </div>
        <p className="text-xs text-content-secondary mb-4 leading-relaxed">
          The machine learning feature extractor was trained on standardized dermoscopic datasets. High image fidelity directly impacts prediction quality.
        </p>

        <ul className="space-y-3 text-xs text-content-main">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Dermoscopic view:</strong> Use images captured with a dermatoscope or close-up macro lens centered directly over the lesion.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Sharp focus:</strong> Avoid motion blur, digital zoom pixelation, and camera shake. The lesion border should be clearly delineated.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Even lighting:</strong> Minimize flash flare, specular highlights, and harsh shadows. Avoid dense hair covering the pigment network.
            </span>
          </li>
        </ul>
      </Card>

      {/* Privacy Notice */}
      <Card className="bg-surface-soft/60">
        <div className="flex items-center gap-2 mb-2 text-navy">
          <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
          <h4 className="text-sm font-semibold">Image Processing & Privacy</h4>
        </div>
        <p className="text-xs text-content-secondary leading-relaxed">
          Uploaded images are sent directly to the local DermaScan FastAPI backend service for preprocessing, feature extraction, and classification. Images are not shared with third-party advertising networks. Please ensure images do not contain identifiable personal facial features or sensitive background details.
        </p>
      </Card>

      {/* Advisory Alert */}
      <div className="rounded-card border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-900 leading-relaxed">
        <div className="flex items-center gap-2 font-semibold mb-1 text-amber-950">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Non-Diagnostic Notice</span>
        </div>
        Dermoscopic AI algorithms have known statistical limitations and varying accuracy across anatomical sites and skin phototypes. This tool is an academic screening aid, not a clinical biopsy substitute.
      </div>
    </div>
  );
};
