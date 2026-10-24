import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import {
  BookOpen,
  Cpu,
  ShieldAlert,
  Code2,
  FileText,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <PageContainer size="narrow">
      <div className="space-y-10">
        {/* Header */}
        <div className="border-b border-med-border pb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic Project Documentation</span>
          </div>
          <h1 className="text-3xl font-bold text-navy tracking-tight">
            About DermaScan
          </h1>
          <p className="text-base text-content-secondary mt-1">
            AI-assisted skin lesion screening prototype exploring deep convolutional neural networks and transfer learning.
          </p>
        </div>

        {/* Section 1: What is DermaScan? */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-navy">What is DermaScan?</h2>
          <p className="text-sm text-content-main leading-relaxed">
            DermaScan is an academic machine learning research project developed for Semester 3 PBL (Project-Based Learning). Its objective is to build a reliable, transparent, and non-diagnostic computer-aided screening interface for dermoscopic skin lesions.
          </p>
          <p className="text-sm text-content-main leading-relaxed">
            By analyzing pigmented skin lesions through transfer learning architectures, DermaScan demonstrates how deep feature representations can assist in preliminary screening stratification before formal dermatological consultation.
          </p>
        </section>

        {/* Section 2: How It Works */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-navy">System Workflow</h2>
          <div className="space-y-3">
            {[
              {
                step: '1. Image Acquisition & Ingestion',
                desc: 'A user uploads a high-resolution dermoscopic image via a drag-and-drop interface. The client inspects file format (JPEG/PNG) and ensures size is within 10MB.',
              },
              {
                step: '2. Preprocessing & Standardization',
                desc: 'The backend validates image integrity via PIL, converts any color profile to standard 3-channel RGB, and resizes the array to the network input shape (224×224 pixels).',
              },
              {
                step: '3. Feature Extraction & Classification',
                desc: 'The tensor is passed through the pre-trained convolutional backbone (e.g., EfficientNetB0), which maps fine visual patterns (pigment network, globules, streaks) into multiclass Softmax probabilities.',
              },
              {
                step: '4. Structured API Contract Response',
                desc: 'The server returns an authenticated JSON schema with primary predicted class, probability scores, severity tier, and model metadata.',
              },
              {
                step: '5. Transparent Presentation & Screening Guidance',
                desc: 'The frontend presents the predicted class, visual probability bars, and cautious next-step guidance highlighting the ABCDE rule and professional clinical consultation.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-med-border flex items-start gap-3 shadow-subtle"
              >
                <div className="w-7 h-7 rounded-full bg-primary-light text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-navy">{item.step}</h4>
                  <p className="text-xs text-content-secondary mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Machine Learning Methodology */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-navy">Machine Learning Methodology</h2>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-content-main space-y-3 leading-relaxed">
            <p>
              <strong>Architecture Distinction:</strong> The project proposal explores multiple convolutional backbones for dermatological feature extraction, including <em>DenseNet121</em>, <em>MobileNetV2</em>, <em>InceptionV3</em>, <em>ResNet50</em>, and <em>EfficientNet</em>. In Phase 2 experiments, feature extraction was implemented using frozen <strong>EfficientNetB0</strong> and <strong>EfficientNetB3</strong> backbones with ImageNet weights.
            </p>
            <p>
              <strong>Inference Pipeline:</strong> When deployed to inference, feature extraction is combined with dense classification layers trained on the <strong>HAM10000</strong> (Human Against Machine with 10,000 images) benchmark dataset. The output is a 7-class probability distribution:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-content-secondary font-mono text-[11px]">
              <li>akiec — Actinic keratoses and intraepithelial carcinoma</li>
              <li>bcc — Basal cell carcinoma</li>
              <li>bkl — Benign keratosis-like lesions</li>
              <li>df — Dermatofibroma</li>
              <li>mel — Melanoma</li>
              <li>nv — Melanocytic nevi</li>
              <li>vasc — Vascular lesions</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Limitations (id="limitations") */}
        <section id="limitations" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl font-bold text-navy">Clinical & Algorithmic Limitations</h2>
          </div>

          <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-2.5 leading-relaxed">
            <p>
              <strong>Dataset Bias & Population Generalization:</strong> The HAM10000 dataset consists predominantly of light skin phototypes (Fitzpatrick I–III) collected in European and Australian clinical centers. Deep learning models trained on this distribution may exhibit reduced sensitivity or specificity when evaluating darker phototypes (Fitzpatrick IV–VI) or atypical anatomical sites.
            </p>
            <p>
              <strong>Image Artifacts:</strong> Glare, air bubbles under immersion fluid, hair, surgical ink markings, and severe blur can induce spurious activations and misleading predictions.
            </p>
            <p>
              <strong>Non-Diagnostic Output:</strong> A high confidence classification does not establish a diagnosis; conversely, a low benign classification does not guarantee the absence of malignancy. <strong>Histopathological biopsy remains the gold standard for definitive skin lesion diagnosis.</strong>
            </p>
          </div>
        </section>

        {/* Section 5: Data and Privacy (id="privacy") */}
        <section id="privacy" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-navy">Data & Privacy Information</h2>
          </div>
          <p className="text-sm text-content-main leading-relaxed">
            DermaScan operates locally without third-party ad telemetry or external data brokers. Uploaded images are handled by the local FastAPI application server in memory or temporary session caches. Scans can be manually purged at any time from the Scan History page.
          </p>
        </section>

        {/* Section 6: Verified Technology Stack */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-navy">Verified Technology Stack</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white rounded-lg border border-med-border">
              <span className="text-content-secondary block">Frontend Framework</span>
              <strong className="text-navy">React 19 + TypeScript</strong>
            </div>
            <div className="p-3 bg-white rounded-lg border border-med-border">
              <span className="text-content-secondary block">Build Tool</span>
              <strong className="text-navy">Vite</strong>
            </div>
            <div className="p-3 bg-white rounded-lg border border-med-border">
              <span className="text-content-secondary block">Styling</span>
              <strong className="text-navy">Tailwind CSS</strong>
            </div>
            <div className="p-3 bg-white rounded-lg border border-med-border">
              <span className="text-content-secondary block">Icons</span>
              <strong className="text-navy">Lucide React</strong>
            </div>
            <div className="p-3 bg-white rounded-lg border border-med-border">
              <span className="text-content-secondary block">Backend Framework</span>
              <strong className="text-navy">FastAPI + Uvicorn</strong>
            </div>
            <div className="p-3 bg-white rounded-lg border border-med-border">
              <span className="text-content-secondary block">Image Processing</span>
              <strong className="text-navy">Pillow (PIL)</strong>
            </div>
          </div>
        </section>
      </div>
    </PageContainer>
  );
};
