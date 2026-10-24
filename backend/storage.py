"""
DermaScan Storage Engine
Maintains persisted scan metadata and history for the application session.
"""

import os
import json
import base64
import io
from typing import Dict, List, Optional
from PIL import Image

from schemas import PredictionResponse, ScanHistoryItem

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
STORAGE_FILE = os.path.join(DATA_DIR, "scans.json")
THUMBNAIL_MAX_SIZE = (128, 128)

_scans_cache: Dict[str, dict] = {}


def _ensure_data_dir():
    os.makedirs(DATA_DIR, exist_ok=True)


def _load_persisted_scans():
    global _scans_cache
    _ensure_data_dir()
    if os.path.exists(STORAGE_FILE):
        try:
            with open(STORAGE_FILE, "r", encoding="utf-8") as f:
                _scans_cache = json.load(f)
        except Exception as e:
            print(f"[Storage] Could not load persisted scans: {e}")
            _scans_cache = {}


def _save_persisted_scans():
    _ensure_data_dir()
    try:
        with open(STORAGE_FILE, "w", encoding="utf-8") as f:
            json.dump(_scans_cache, f, indent=2)
    except Exception as e:
        print(f"[Storage] Could not persist scans: {e}")


def generate_thumbnail_data_url(image_bytes: bytes) -> Optional[str]:
    """Generate a lightweight base64 thumbnail for scan history display."""
    try:
        img = Image.open(io.BytesIO(image_bytes))
        img.thumbnail(THUMBNAIL_MAX_SIZE)
        if img.mode != "RGB":
            img = img.convert("RGB")
        buffer = io.BytesIO()
        img.save(buffer, format="JPEG", quality=75)
        encoded = base64.b64encode(buffer.getvalue()).decode("utf-8")
        return f"data:image/jpeg;base64,{encoded}"
    except Exception as e:
        print(f"[Storage] Thumbnail creation error: {e}")
        return None


def generate_full_preview_data_url(image_bytes: bytes, mime_type: str = "image/jpeg") -> Optional[str]:
    """Generate a client-viewable data URL for the analyzed image preview."""
    try:
        encoded = base64.b64encode(image_bytes).decode("utf-8")
        return f"data:{mime_type};base64,{encoded}"
    except Exception as e:
        print(f"[Storage] Preview creation error: {e}")
        return None


def save_scan(response: PredictionResponse) -> None:
    """Save a scan result into storage."""
    global _scans_cache
    if not _scans_cache:
        _load_persisted_scans()
    
    _scans_cache[response.scan_id] = response.model_dump()
    _save_persisted_scans()


def get_scan(scan_id: str) -> Optional[PredictionResponse]:
    """Retrieve full scan details by scan_id."""
    global _scans_cache
    if not _scans_cache:
        _load_persisted_scans()
        
    data = _scans_cache.get(scan_id)
    if not data:
        return None
    return PredictionResponse(**data)


def list_scans() -> List[ScanHistoryItem]:
    """List all recorded scans in reverse chronological order."""
    global _scans_cache
    if not _scans_cache:
        _load_persisted_scans()
        
    items: List[ScanHistoryItem] = []
    for scan_id, data in _scans_cache.items():
        prediction = data.get("prediction", {})
        model_info = data.get("model", {})
        items.append(
            ScanHistoryItem(
                scan_id=scan_id,
                created_at=data.get("created_at", ""),
                filename=data.get("filename", "unknown.jpg"),
                class_name=prediction.get("class_name", "Unknown"),
                class_code=prediction.get("class_code", "unknown"),
                confidence=prediction.get("confidence", 0.0),
                category=prediction.get("category", "General"),
                severity_hint=prediction.get("severity_hint", "low"),
                is_simulated=model_info.get("is_simulated", True),
                thumbnail_url=data.get("image_data_url")
            )
        )
    
    # Sort descending by creation timestamp
    items.sort(key=lambda x: x.created_at, reverse=True)
    return items


def delete_scan(scan_id: str) -> bool:
    """Delete a scan by scan_id."""
    global _scans_cache
    if not _scans_cache:
        _load_persisted_scans()
        
    if scan_id in _scans_cache:
        del _scans_cache[scan_id]
        _save_persisted_scans()
        return True
    return False


# Initialize cache at startup
_load_persisted_scans()
