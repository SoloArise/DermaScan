import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldAlert, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-med-border text-content-main mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand and Description */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-navy">
                Derma<span className="text-primary">Scan</span>
              </span>
            </div>
            <p className="text-sm text-content-secondary max-w-md leading-relaxed">
              DermaScan is an academic machine learning research project demonstrating
              deep learning feature extraction and multiclass lesion classification
              for educational dermoscopic screening assistance.
            </p>
            <div className="flex items-center gap-2 text-xs text-content-secondary">
              <BookOpen className="w-4 h-4 text-primary shrink-0" />
              <span>PBL Project — Semester 3 Academic Demonstration</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-navy uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-content-secondary">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/scan" className="hover:text-primary transition-colors">
                  Skin Scan
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-primary transition-colors">
                  Scan History
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About & Methodology
                </Link>
              </li>
            </ul>
          </div>

          {/* Privacy & Safety */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-navy uppercase tracking-wider">
              Responsible Use
            </h4>
            <ul className="space-y-2 text-sm text-content-secondary">
              <li>
                <Link to="/about#limitations" className="hover:text-primary transition-colors">
                  Clinical Limitations
                </Link>
              </li>
              <li>
                <Link to="/about#privacy" className="hover:text-primary transition-colors">
                  Data & Image Privacy
                </Link>
              </li>
              <li>
                <a
                  href="https://www.aad.org/public/diseases/skin-cancer/find/atypical-moles/detect"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  ABCDE Skin Guidelines
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Medical Disclaimer Banner Box */}
        <div className="p-4 rounded-xl bg-surface-soft border border-med-border mb-8 text-xs text-content-secondary leading-relaxed flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-navy block mb-0.5">
              Strict Non-Diagnostic & Educational Medical Disclaimer
            </span>
            DermaScan is an academic machine learning prototype and does NOT offer medical diagnoses, treatment advice, or formal clinical risk scoring. Dermoscopic analysis produces mathematical classification probabilities based on training dataset distributions. Never disregard professional clinical advice or delay seeking evaluation from a board-certified dermatologist because of an output from this application.
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-med-border flex flex-col sm:flex-row items-center justify-between text-xs text-content-secondary gap-3">
          <p>© {new Date().getFullYear()} DermaScan. Academic Project. All rights reserved.</p>
          <p>Built with React, Vite, TypeScript, Tailwind CSS, & FastAPI.</p>
        </div>
      </div>
    </footer>
  );
};
