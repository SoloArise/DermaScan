import { requestJson } from './api';
import type { ScanResult, ScanHistorySummary, HealthStatus } from '../types/scan';

export async function uploadAndAnalyzeImage(file: File): Promise<ScanResult> {
  const formData = new FormData();
  formData.append('file', file);

  return await requestJson<ScanResult>('/api/v1/predict', {
    method: 'POST',
    body: formData,
  });
}

export async function checkServerHealth(): Promise<HealthStatus> {
  return await requestJson<HealthStatus>('/api/v1/health', {
    method: 'GET',
  });
}

export async function fetchScanHistory(): Promise<ScanHistorySummary[]> {
  return await requestJson<ScanHistorySummary[]>('/api/v1/scans', {
    method: 'GET',
  });
}

export async function fetchScanDetails(scanId: string): Promise<ScanResult> {
  return await requestJson<ScanResult>(`/api/v1/scans/${encodeURIComponent(scanId)}`, {
    method: 'GET',
  });
}

export async function deleteScanRecord(scanId: string): Promise<{ success: boolean; scan_id: string; message: string }> {
  return await requestJson<{ success: boolean; scan_id: string; message: string }>(
    `/api/v1/scans/${encodeURIComponent(scanId)}`,
    {
      method: 'DELETE',
    }
  );
}
