import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { EmptyState } from '../components/ui/EmptyState';
import { PredictionCard } from '../components/results/PredictionCard';
import { RecommendationCard } from '../components/results/RecommendationCard';
import type { PredictionDetail, ModelInfo } from '../types/scan';

describe('UI Component Unit Tests', () => {
  it('renders Button with text and handles loading state', () => {
    const { rerender } = render(<Button>Analyze Image</Button>);
    expect(screen.getByText('Analyze Image')).toBeTruthy();

    rerender(<Button isLoading>Analyze Image</Button>);
    const button = screen.getByRole('button');
    expect(button.getAttribute('disabled')).not.toBeNull();
  });

  it('renders Alert component with title and message', () => {
    render(
      <Alert variant="warning" title="Disclaimer Warning">
        This is an educational prototype.
      </Alert>
    );
    expect(screen.getByText('Disclaimer Warning')).toBeTruthy();
    expect(screen.getByText('This is an educational prototype.')).toBeTruthy();
  });

  it('renders EmptyState with action button', () => {
    let clicked = false;
    render(
      <EmptyState
        title="No Scans Yet"
        description="Upload a photo to see results."
        actionText="Upload Now"
        onAction={() => {
          clicked = true;
        }}
      />
    );
    expect(screen.getByText('No Scans Yet')).toBeTruthy();
    const btn = screen.getByText('Upload Now');
    btn.click();
    expect(clicked).toBe(true);
  });

  it('renders PredictionCard with prediction details and simulation banner', () => {
    const mockPrediction: PredictionDetail = {
      class_name: 'Melanoma',
      class_code: 'mel',
      confidence: 0.885,
      category: 'Malignant Melanocytic',
      severity_hint: 'urgent_evaluation',
      description: 'Aggressive melanocytic tumor requiring immediate consultation.',
      screening_guidance: 'Prompt in-person dermatological evaluation required.',
      probabilities: [
        { code: 'mel', name: 'Melanoma', probability: 0.885, severity: 'urgent_evaluation' },
        { code: 'nv', name: 'Melanocytic Nevi', probability: 0.115, severity: 'low' },
      ],
    };

    const mockModel: ModelInfo = {
      name: 'DermaScan-Dev-Simulation',
      version: '0.9.0-dev',
      architecture: 'Simulated-Dev-Heuristic',
      is_simulated: true,
      notice: 'DEV PREVIEW NOTICE',
    };

    render(<PredictionCard prediction={mockPrediction} model={mockModel} />);
    expect(screen.getByText('Melanoma')).toBeTruthy();
    expect(screen.getByText('88.5%')).toBeTruthy();
    expect(screen.getByText('DEVELOPMENT PREVIEW MODE (SIMULATION ONLY)')).toBeTruthy();
    expect(screen.getByText('DEV PREVIEW NOTICE')).toBeTruthy();
  });

  it('renders RecommendationCard with clinical protocol and ABCDE rules', () => {
    const mockPrediction: PredictionDetail = {
      class_name: 'Melanocytic Nevi',
      class_code: 'nv',
      confidence: 0.92,
      category: 'Benign',
      severity_hint: 'low',
      description: 'Common benign mole.',
      screening_guidance: 'Benign finding. Continue monitoring using the ABCDE rule.',
      probabilities: [],
    };

    render(<RecommendationCard prediction={mockPrediction} />);
    expect(screen.getByText('Recommended Screening Next Steps')).toBeTruthy();
    expect(screen.getByText(/Benign finding. Continue monitoring/)).toBeTruthy();
    expect(screen.getByText(/Clinical Reference: The ABCDE Skin Rule/)).toBeTruthy();
  });
});
