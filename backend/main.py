"""
DermaScan AI Skin Screening Backend
FastAPI server providing lesion classification, health checks, and scan history.
"""

import os
import uuid
from datetime import datetime, timezone
from typing import List

from fastapi import FastAPI, UploadFile, File, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from classes import HAM10000_CLASSES
from schemas import (
    PredictionResponse,
    HealthResponse,
    ScanHistoryItem,
    DeleteResponse
)
from model_service import run_inference, get_model_status
from storage import (
    save_scan,
    get_scan,
    list_scans,
    delete_scan,
    generate_full_preview_data_url
)

# Configuration
MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024  # 10 MB
ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/jpg"}

app = FastAPI(
    title="DermaScan API",
    description="AI-Assisted Skin Lesion Screening System API",
    version="1.0.0"
)

# Enable CORS for frontend development and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for local academic dev; adjust in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/v1/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint exposing server status and model load status."""
    status_info = get_model_status()
    supported_classes = [
        {"code": code, "name": meta["name"], "category": meta["category"]}
        for code, meta in HAM10000_CLASSES.items()
    ]
    
    return HealthResponse(
        status="healthy",
        is_model_loaded=status_info["is_model_loaded"],
        model_mode="real_inference" if status_info["is_model_loaded"] else "simulated_development",
        model_name=status_info["model_name"],
        version=status_info["model_version"],
        supported_classes=supported_classes,
        timestamp=datetime.now(timezone.utc).isoformat()
    )


@app.post("/api/v1/predict", response_model=PredictionResponse)
async def predict_skin_lesion(file: UploadFile = File(...)):
    """
    Accepts an uploaded dermoscopic image and returns the classification prediction.
    Strictly validates file format, size, and integrity.
    """
    if not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No filename provided in upload."
        )

    # Check content type
    content_type = file.content_type.lower() if file.content_type else ""
    if content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file format '{content_type}'. Please upload a JPEG or PNG image."
        )

    # Read file content safely
    try:
        content = await file.read()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to read uploaded file: {str(e)}"
        )

    if len(content) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The uploaded file is empty."
        )

    if len(content) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File exceeds maximum allowed size of {MAX_FILE_SIZE_BYTES // (1024 * 1024)}MB."
        )

    # Run inference or dev simulation
    try:
        prediction_detail, model_info = run_inference(content, file.filename)
    except ValueError as val_err:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Image validation failed: {str(val_err)}"
        )
    except RuntimeError as run_err:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(run_err)
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Inference error encountered: {str(exc)}"
        )

    # Assemble response
    scan_id = f"scan_{uuid.uuid4().hex[:12]}"
    created_at = datetime.now(timezone.utc).isoformat()
    image_data_url = generate_full_preview_data_url(content, content_type)

    response = PredictionResponse(
        scan_id=scan_id,
        created_at=created_at,
        prediction=prediction_detail,
        model=model_info,
        filename=file.filename,
        file_size_bytes=len(content),
        image_data_url=image_data_url
    )

    # Persist scan history
    save_scan(response)

    return response


@app.get("/api/v1/scans", response_model=List[ScanHistoryItem])
async def get_all_scans():
    """Retrieve history of previous scans."""
    return list_scans()


@app.get("/api/v1/scans/{scan_id}", response_model=PredictionResponse)
async def get_scan_by_id(scan_id: str):
    """Retrieve details for a specific scan."""
    scan = get_scan(scan_id)
    if not scan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Scan record '{scan_id}' not found."
        )
    return scan


@app.delete("/api/v1/scans/{scan_id}", response_model=DeleteResponse)
async def delete_scan_by_id(scan_id: str):
    """Delete a scan record from history."""
    success = delete_scan(scan_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Scan record '{scan_id}' not found."
        )
    return DeleteResponse(
        success=True,
        scan_id=scan_id,
        message="Scan record removed successfully."
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
