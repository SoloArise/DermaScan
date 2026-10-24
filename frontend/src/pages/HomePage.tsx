import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  Sparkles,
  FileSearch,
  Stethoscope,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-teal-50/50 via-surface-bg to-surface-bg py-12 md:py-20 border-b border-med-border">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold uppercase tracking-wider border border-teal-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI-Assisted Skin Screening</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy leading-tight tracking-tight">
                Understand Your Skin.{' '}
                <span className="text-primary block mt-1">Take the Next Step.</span>
              </h1>

              <p className="text-base sm:text-lg text-content-secondary max-w-xl leading-relaxed">
                Upload a dermoscopic skin-lesion image to receive an AI-assisted classification result and guidance on appropriate next steps.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link to="/scan">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto shadow-md"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Start Skin Scan
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    How It Works
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex items-center gap-6 text-xs text-content-secondary">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Educational Prototype</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-primary" />
                  <span>EfficientNet Architecture</span>
                </div>
              </div>
            </div>

            {/* Right Hero Graphic Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md">
                {/* Decorative background glow */}
                <div className="absolute -inset-1 rounded-card-lg bg-gradient-to-r from-teal-500/20 to-blue-500/20 blur-xl opacity-70" />

                <Card className="relative bg-white/95 backdrop-blur border-med-border shadow-card p-6 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-med-border">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[11px] font-mono text-content-secondary">
                      DERMASCOPIC_SCREEN_V1
                    </span>
                  </div>

                  {/* Abstract Dermoscopic Illustration Graphic */}
                  <div className="relative h-44 rounded-xl bg-gradient-to-br from-slate-900 to-navy overflow-hidden flex items-center justify-center p-4">
                    {/* Concentric scan rings */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full border border-teal-500/30 animate-ping opacity-25" />
                      <div className="w-24 h-24 rounded-full border border-teal-400/40" />
                      <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-300/60 flex items-center justify-center">
                        <FileSearch className="w-8 h-8 text-teal-300" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-teal-200 font-mono">
                      ISIC / HAM10000
                    </div>
                  </div>

                  {/* Sample Mock Screening Readout (illustrative) */}
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-content-secondary font-medium">Model Pipeline</span>
                      <span className="font-semibold text-primary">EfficientNetB0 Deep Feature Extractor</span>
                    </div>

                    <div className="p-3 bg-surface-soft rounded-lg space-y-1.5 border border-med-border">
                      <div className="flex justify-between text-xs font-semibold text-content-main">
                        <span>Multiclass Confidence Distribution</span>
                        <span className="text-primary font-mono">Real-time</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full w-4/5" />
                      </div>
                    </div>

                    <div className="text-[11px] text-content-secondary italic text-center">
                      *Illustrative workflow visualization. Upload your image to receive real predictions.
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Feature Section */}
      <section className="py-16 md:py-20 bg-white">
        <PageContainer>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">
              Designed for Clear, Responsible Screening
            </h2>
            <p className="text-sm sm:text-base text-content-secondary leading-relaxed">
              DermaScan combines deep learning computer vision with transparent screening guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card hoverEffect className="space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-primary">
                  <FileSearch className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-navy">1. Image-Based Screening</h3>
                <p className="text-sm text-content-secondary leading-relaxed">
                  Upload a high-resolution dermoscopic image for automated image preprocessing and neural network feature analysis.
                </p>
              </div>
              <div className="pt-2 text-xs font-medium text-primary flex items-center gap-1">
                <span>Standardized Input</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Card>

            {/* Feature 2 */}
            <Card hoverEffect className="space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-primary">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-navy">2. AI-Assisted Classification</h3>
                <p className="text-sm text-content-secondary leading-relaxed">
                  View the class predicted by the configured model along with calculated confidence metrics across all 7 benchmark lesion categories.
                </p>
              </div>
              <div className="pt-2 text-xs font-medium text-primary flex items-center gap-1">
                <span>Transparent Confidence</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Card>

            {/* Feature 3 */}
            <Card hoverEffect className="space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-primary">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-navy">3. Clear Next-Step Guidance</h3>
                <p className="text-sm text-content-secondary leading-relaxed">
                  Understand the screening result and learn when professional clinical dermatological evaluation and biopsy are recommended.
                </p>
              </div>
              <div className="pt-2 text-xs font-medium text-primary flex items-center gap-1">
                <span>Clinical Reference</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Card>
          </div>
        </PageContainer>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-surface-bg border-y border-med-border">
        <PageContainer>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">
              How the Screening Process Works
            </h2>
            <p className="text-sm text-content-secondary leading-relaxed">
              Three streamlined steps from upload to comprehensive screening summary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-card border border-med-border">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-base mb-4">
                1
              </div>
              <h4 className="text-base font-semibold text-navy mb-2">
                Upload Dermoscopic Image
              </h4>
              <p className="text-xs text-content-secondary leading-relaxed">
                Select or drag a clear JPEG or PNG lesion photo. The client checks file integrity and dimensions before sending.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-card border border-med-border">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-base mb-4">
                2
              </div>
              <h4 className="text-base font-semibold text-navy mb-2">
                Deep Learning Analysis
              </h4>
              <p className="text-xs text-content-secondary leading-relaxed">
                The image is normalized and passed through the deep learning classifier to generate class activation probabilities.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-card border border-med-border">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-base mb-4">
                3
              </div>
              <h4 className="text-base font-semibold text-navy mb-2">
                Review Prediction & Guidance
              </h4>
              <p className="text-xs text-content-secondary leading-relaxed">
                Receive the primary predicted class, probability scores, risk summary, and appropriate clinical screening advice.
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Responsible Use Section */}
      <section className="py-16 bg-white">
        <PageContainer size="narrow">
          <div className="p-8 rounded-card-lg border border-med-border bg-slate-50/70 space-y-4">
            <div className="flex items-center gap-2.5 text-navy">
              <ShieldCheck className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-bold">Academic & Educational Purpose</h3>
            </div>
            <p className="text-sm text-content-secondary leading-relaxed">
              DermaScan was developed as an academic engineering demonstration for Semester 3 PBL (Project-Based Learning). It investigates transfer learning performance on public benchmark dermatological datasets.
            </p>
            <p className="text-sm text-content-secondary leading-relaxed">
              This application is intended strictly for preliminary screening support and educational evaluation. It is <strong>not</strong> an approved medical device, does not diagnose skin cancer, and must never substitute for examination by a licensed medical provider.
            </p>
          </div>
        </PageContainer>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 bg-navy text-white text-center">
        <PageContainer size="narrow">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to review a skin-lesion image?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
              Upload a dermoscopic photo now to test the screening pipeline and view model confidence.
            </p>
            <div>
              <Link to="/scan">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-primary hover:bg-teal-700 text-white shadow-lg font-semibold"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Start Skin Scan
                </Button>
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
};
