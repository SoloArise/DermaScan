export type SeverityHint = 'low' | 'moderate' | 'high' | 'urgent_evaluation';

export interface ProbabilityEntry {
  code: string;
  name: string;
  probability: number;
  severity: SeverityHint;
}

export interface PredictionDetail {
  class_name: string;
  class_code: string;
  confidence: number;
  category: string;
  severity_hint: SeverityHint;
  description: string;
  screening_guidance: string;
  probabilities: ProbabilityEntry[];
}

export interface ModelInfo {
  name: string;
  version: string;
  architecture: string;
  is_simulated: boolean;
  notice?: string;
}

export interface ScanResult {
  scan_id: string;
  created_at: string;
  prediction: PredictionDetail;
  model: ModelInfo;
  filename: string;
  file_size_bytes: number;
  image_data_url?: string;
}

export interface ScanHistorySummary {
  scan_id: string;
  created_at: string;
  filename: string;
  class_name: string;
  class_code: string;
  confidence: number;
  category: string;
  severity_hint: SeverityHint;
  is_simulated: boolean;
  thumbnail_url?: string;
}

export interface HealthStatus {
  status: string;
  is_model_loaded: boolean;
  model_mode: 'real_inference' | 'simulated_development';
  model_name: string;
  version: string;
  supported_classes: Array<{
    code: string;
    name: string;
    category: string;
  }>;
  timestamp: string;
}
