"""
DermaScan Pydantic Data Contracts and Schemas
"""

from typing import Dict, List, Optional
from pydantic import BaseModel, Field


class ProbabilityEntry(BaseModel):
    code: str
    name: str
    probability: float = Field(..., ge=0.0, le=1.0)
    severity: str


class PredictionDetail(BaseModel):
    class_name: str
    class_code: str
    confidence: float = Field(..., ge=0.0, le=1.0)
    category: str
    severity_hint: str
    description: str
    screening_guidance: str
    probabilities: List[ProbabilityEntry]


class ModelInfo(BaseModel):
    name: str
    version: str
    architecture: str
    is_simulated: bool
    notice: Optional[str] = None


class PredictionResponse(BaseModel):
    scan_id: str
    created_at: str
    prediction: PredictionDetail
    model: ModelInfo
    filename: str
    file_size_bytes: int
    image_data_url: Optional[str] = None


class HealthResponse(BaseModel):
    status: str
    is_model_loaded: bool
    model_mode: str
    model_name: str
    version: str
    supported_classes: List[Dict[str, str]]
    timestamp: str


class ScanHistoryItem(BaseModel):
    scan_id: str
    created_at: str
    filename: str
    class_name: str
    class_code: str
    confidence: float
    category: str
    severity_hint: str
    is_simulated: bool
    thumbnail_url: Optional[str] = None


class DeleteResponse(BaseModel):
    success: bool
    scan_id: str
    message: str
