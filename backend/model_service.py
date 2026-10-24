"""
DermaScan Model Inference Service
Handles model loading, image preprocessing, and classification inference.
Strictly distinguishes real trained weights from development simulation mode.
"""

import os
import io
import time
import random
import hashlib
from typing import Tuple, Dict, Any, List
from PIL import Image

from classes import HAM10000_CLASSES, DEFAULT_CLASS_ORDER
from schemas import PredictionDetail, ModelInfo, ProbabilityEntry

# Environment configuration
MODEL_PATH = os.environ.get("MODEL_PATH", os.path.join(os.path.dirname(__file__), "models", "dermascan_model.keras"))
ENABLE_SIMULATION_DEV = os.environ.get("ENABLE_SIMULATION_DEV", "true").lower() in ("true", "1", "yes")

_model = None
_model_load_attempted = False
_model_load_error = None


def get_model_status() -> Dict[str, Any]:
    """Check whether a real trained model artifact is loaded and available."""
    global _model, _model_load_attempted, _model_load_error
    
    weights_exist = os.path.exists(MODEL_PATH)
    
    return {
        "is_model_loaded": _model is not None,
        "weights_file_exists": weights_exist,
        "weights_path": MODEL_PATH,
        "load_error": _model_load_error,
        "simulation_dev_enabled": ENABLE_SIMULATION_DEV,
        "model_name": "EfficientNetB0-HAM10000" if _model is not None else "DermaScan-Dev-Simulation",
        "model_version": "1.0.0" if _model is not None else "0.9.0-dev",
        "architecture": "EfficientNetB0" if _model is not None else "Simulated-Dev-Heuristic",
    }


def try_load_model():
    """Attempt to load real Keras model weights if present."""
    global _model, _model_load_attempted, _model_load_error
    if _model_load_attempted:
        return _model

    _model_load_attempted = True
    
    if not os.path.exists(MODEL_PATH):
        _model_load_error = f"Model artifact not found at {MODEL_PATH}."
        return None

    try:
        import tensorflow as tf
        _model = tf.keras.models.load_model(MODEL_PATH)
        print(f"[DermaScan] Successfully loaded trained model from {MODEL_PATH}")
        return _model
    except ImportError:
        _model_load_error = "TensorFlow is not installed in the current Python environment."
        print(f"[DermaScan Warning] {_model_load_error}")
        return None
    except Exception as e:
        _model_load_error = f"Error loading model weights: {str(e)}"
        print(f"[DermaScan Error] {_model_load_error}")
        return None


def preprocess_image(image_bytes: bytes, target_size: Tuple[int, int] = (224, 224)) -> Image.Image:
    """Validate image bytes and convert to RGB PIL Image."""
    try:
        image = Image.open(io.BytesIO(image_bytes))
        image.verify()  # Verify integrity
        # Re-open after verify as per PIL documentation
        image = Image.open(io.BytesIO(image_bytes))
        if image.mode != "RGB":
            image = image.convert("RGB")
        return image
    except Exception as exc:
        raise ValueError(f"Invalid or corrupted image file: {str(exc)}") from exc


def run_inference(image_bytes: bytes, filename: str) -> Tuple[PredictionDetail, ModelInfo]:
    """
    Run prediction on the given image.
    If a real model is loaded, uses actual deep learning predictions.
    If no trained model artifact exists and development simulation is enabled,
    returns an explicitly labeled simulated result for end-to-end integration testing.
    """
    model = try_load_model()
    
    # 1. Real Model Inference Pipeline
    if model is not None:
        try:
            import numpy as np
            pil_img = preprocess_image(image_bytes, target_size=(224, 224))
            img_resized = pil_img.resize((224, 224), Image.Resampling.BILINEAR)
            img_array = np.array(img_resized, dtype=np.float32)
            # EfficientNet preprocessing: values [0, 255] or standard normalization
            img_batch = np.expand_dims(img_array, axis=0)
            
            raw_predictions = model.predict(img_batch)[0]
            
            probabilities: List[ProbabilityEntry] = []
            for idx, code in enumerate(DEFAULT_CLASS_ORDER):
                prob = float(raw_predictions[idx]) if idx < len(raw_predictions) else 0.0
                meta = HAM10000_CLASSES.get(code, {})
                probabilities.append(ProbabilityEntry(
                    code=code,
                    name=meta.get("name", code),
                    probability=round(prob, 4),
                    severity=meta.get("severity", "low")
                ))
            
            probabilities.sort(key=lambda x: x.probability, reverse=True)
            top_prediction = probabilities[0]
            top_meta = HAM10000_CLASSES.get(top_prediction.code, {})
            
            prediction = PredictionDetail(
                class_name=top_meta.get("name", top_prediction.name),
                class_code=top_prediction.code,
                confidence=top_prediction.probability,
                category=top_meta.get("category", "General"),
                severity_hint=top_meta.get("severity", "moderate"),
                description=top_meta.get("summary", ""),
                screening_guidance=top_meta.get("screening_guidance", ""),
                probabilities=probabilities
            )
            
            model_info = ModelInfo(
                name="DermaScan-EfficientNetB0",
                version="1.0.0",
                architecture="EfficientNetB0-TransferLearned",
                is_simulated=False,
                notice=None
            )
            return prediction, model_info
        except Exception as e:
            print(f"[DermaScan Inference Error] Real model execution failed: {e}")
            # Do NOT silently fallback to fake real responses if production
            raise RuntimeError(f"Model inference failed: {str(e)}")

    # 2. Missing Model Artifact Handling
    if not ENABLE_SIMULATION_DEV:
        raise RuntimeError(
            "Trained model artifact is missing and ENABLE_SIMULATION_DEV is false. "
            "Real inference cannot be completed. Please place trained model weights at backend/models/dermascan_model.keras"
        )

    # 3. Development-Only Preview Mode
    # Strictly documented and marked as simulated
    # We compute deterministic pseudo-probabilities from image hash to provide reproducible UI testing
    pil_img = preprocess_image(image_bytes)
    hasher = hashlib.sha256(image_bytes)
    digest = hasher.digest()
    
    # Pick a class deterministically based on image content
    class_index = digest[0] % len(DEFAULT_CLASS_ORDER)
    primary_code = DEFAULT_CLASS_ORDER[class_index]
    primary_meta = HAM10000_CLASSES[primary_code]
    
    # Seed reproducible confidence between 0.72 and 0.94
    primary_conf = 0.72 + (digest[1] % 220) / 1000.0
    
    remaining_prob = 1.0 - primary_conf
    other_codes = [c for c in DEFAULT_CLASS_ORDER if c != primary_code]
    
    # Distribute remainder
    weights = [digest[i + 2] + 1 for i in range(len(other_codes))]
    sum_weights = sum(weights)
    
    probabilities: List[ProbabilityEntry] = []
    probabilities.append(ProbabilityEntry(
        code=primary_code,
        name=primary_meta["name"],
        probability=round(primary_conf, 4),
        severity=primary_meta["severity"]
    ))
    
    for code, w in zip(other_codes, weights):
        meta = HAM10000_CLASSES[code]
        p = round(remaining_prob * (w / sum_weights), 4)
        probabilities.append(ProbabilityEntry(
            code=code,
            name=meta["name"],
            probability=p,
            severity=meta["severity"]
        ))
        
    probabilities.sort(key=lambda x: x.probability, reverse=True)
    
    prediction = PredictionDetail(
        class_name=primary_meta["name"],
        class_code=primary_code,
        confidence=round(primary_conf, 4),
        category=primary_meta["category"],
        severity_hint=primary_meta["severity"],
        description=primary_meta["summary"],
        screening_guidance=primary_meta["screening_guidance"],
        probabilities=probabilities
    )
    
    model_info = ModelInfo(
        name="DermaScan-Dev-Simulation",
        version="0.9.0-dev",
        architecture="Simulated-Heuristic (Dev Preview Mode)",
        is_simulated=True,
        notice=(
            "DEVELOPMENT PREVIEW MODE: Model weights artifact (dermascan_model.keras) was not detected in backend/models. "
            "This prediction is simulated for UI and API integration verification and must NOT be used for clinical evaluation."
        )
    )
    
    return prediction, model_info
