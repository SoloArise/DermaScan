# DermaScan Model Artifacts Directory

This directory is where trained deep learning model weights should be placed for production inference.

## Model Requirements

- **Filename**: `dermascan_model.keras` or `dermascan_model.h5`
- **Expected Architecture**: EfficientNetB0 or EfficientNetB3 trained on dermoscopic image datasets (e.g. HAM10000 / ISIC).
- **Input Dimensions**: `(224, 224, 3)` (or `(300, 300, 3)` if using EfficientNetB3).
- **Output Layer**: 7-unit Softmax activation corresponding to the HAM10000 class ordering:
  1. `akiec` — Actinic keratoses and intraepithelial carcinoma
  2. `bcc` — Basal cell carcinoma
  3. `bkl` — Benign keratosis-like lesions
  4. `df` — Dermatofibroma
  5. `mel` — Melanoma
  6. `nv` — Melanocytic nevi
  7. `vasc` — Vascular lesions

## How to Deploy Model Weights

1. Place your trained `.keras` file at:
   ```
   backend/models/dermascan_model.keras
   ```
2. Set the `MODEL_PATH` environment variable if using a custom path:
   ```bash
   export MODEL_PATH="backend/models/dermascan_model.keras"
   ```
3. Restart the FastAPI server. The `/api/v1/health` endpoint will report:
   ```json
   {
     "status": "healthy",
     "is_model_loaded": true,
     "model_mode": "real_inference"
   }
   ```
4. When `dermascan_model.keras` is absent, the server operates in **Development Preview Mode** (`is_simulated: true`), ensuring the user interface can be tested end-to-end without misrepresenting simulated outputs as clinical predictions.
