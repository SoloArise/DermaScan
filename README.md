# DermaScan — AI-Assisted Skin Lesion Screening System

[![Academic PBL](https://img.shields.io/badge/Project-PBL%20Semester%203-teal.svg)](#)
[![Stack](https://img.shields.io/badge/Stack-React%2019%20%7C%20FastAPI%20%7C%20Tailwind%20CSS-16324F.svg)](#)
[![Dataset](https://img.shields.io/badge/Dataset-HAM10000%20%2F%20ISIC-0F766E.svg)](#)
[![License](https://img.shields.io/badge/License-Academic%20Evaluation-gray.svg)](#)

> **IMPORTANT NON-DIAGNOSTIC MEDICAL DISCLAIMER:**  
> DermaScan is an academic machine learning research demonstration and screening prototype developed for Semester 3 PBL (Project-Based Learning). It does **NOT** provide medical diagnoses, clinical staging, or treatment recommendations. The classification outputs and confidence percentages represent mathematical activations from a computer vision model trained on public benchmark data. Never disregard licensed medical advice or delay clinical evaluation by a board-certified dermatologist based on screening results from this software.

---

## 1. Project Overview

**DermaScan** is a modern, responsive digital health web application designed for computer-aided skin lesion screening. Users can upload high-resolution dermoscopic images to evaluate them against deep convolutional neural network feature representations across the 7 international **HAM10000** lesion classes:

1. **akiec** — Actinic Keratoses and Intraepithelial Carcinoma (Bowen's disease)
2. **bcc** — Basal Cell Carcinoma
3. **bkl** — Benign Keratosis-like Lesions (Seborrheic keratoses, solar lentigines)
4. **df** — Dermatofibroma
5. **mel** — Melanoma
6. **nv** — Melanocytic Nevi
7. **vasc** — Vascular Lesions (Angiomas, pyogenic granulomas)

The application provides a two-column desktop workflow, drag-and-drop file ingestion, client-side validation, full multiclass probability distributions, structured clinical screening protocols, and local scan session history.

---

## 2. Key Features

- **Responsive Healthcare SaaS Interface**: Tailored healthcare design system adhering to strict color contrast, Inter typography, 14–18px card radii, and subtle shadows.
- **Drag-and-Drop Ingestion**: Interactive drag-and-drop zone with instant local preview, file size/format validation (JPEG/PNG up to 10MB), and image replace/remove controls.
- **Multiclass Differential Probabilities**: Displays the primary predicted class and a sorted breakdown across all 7 HAM10000 classes.
- **Responsible Medical Protocol**: Class-specific recommendations, clinical ABCDE melanoma criteria reference, and non-diagnostic alerts.
- **Honest Model State Transparency**: When trained deep learning weights are absent, the system operates in an explicit **Development Preview Mode** (`is_simulated: true`), ensuring frontend integration can be verified without presenting simulated values as clinical predictions.
- **Scan History & Persistence**: Reverse-chronological session history with thumbnail caching, search filtering, and deletion confirmation modal.
- **Automated Test Coverage**: Vitest unit/component suite and Python unittest API suite covering validation, schemas, and endpoints.

---

## 3. Technology Stack

### Frontend
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite`)
- **Icons**: Lucide React
- **Routing**: React Router v7
- **Testing**: Vitest + React Testing Library + jsdom

### Backend
- **Framework**: FastAPI (Python 3.10–3.14 compatible)
- **ASGI Server**: Uvicorn
- **Image Processing**: Pillow (PIL)
- **Validation**: Pydantic v2
- **Deep Learning Inference**: TensorFlow / Keras (EfficientNetB0 / EfficientNetB3)

---

## 4. Prerequisites

- **Node.js**: `v18.0.0` or later (`v25.9.0` verified)
- **npm**: `v9.0.0` or later (`v11.13.0` verified)
- **Python**: `3.10+` (`3.14.4` verified)
- **pip**: Package installer for Python

---

## 5. Installation & Setup

### Clone Repository & Workspace
```bash
cd "DermaScan"
```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install Python dependencies:
   ```bash
   python -m pip install -r requirements.txt
   ```
3. Start the FastAPI development server:
   ```bash
   python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
   ```
   *The API will be available at `http://127.0.0.1:8000` with interactive docs at `http://127.0.0.1:8000/docs`.*

### Frontend Setup
1. In a new terminal, navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` configuration:
   ```bash
   cp .env.example .env
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will be available at `http://127.0.0.1:5173`.*

---

## 6. Environment Configuration

### Frontend (`frontend/.env`)
```bash
# Backend endpoint base URL
VITE_API_BASE_URL=http://localhost:8000
```

### Backend (`backend/.env` or OS Environment)
```bash
# Optional path to real trained model weights
MODEL_PATH=models/dermascan_model.keras

# Enable development simulation when model weights are not loaded (default: true)
ENABLE_SIMULATION_DEV=true
```

---

## 7. Connecting Real Trained ML Model Weights

When trained model weights are saved from Phase 2 / Phase 3 training scripts:

1. Export or copy your trained Keras model file to:
   ```
   backend/models/dermascan_model.keras
   ```
   *(or `.h5` format).*
2. Verify the model input shape is `(224, 224, 3)` (for EfficientNetB0) and the final layer is a 7-unit Softmax activation corresponding to:
   `['akiec', 'bcc', 'bkl', 'df', 'mel', 'nv', 'vasc']`.
3. Restart the backend:
   ```bash
   python -m uvicorn main:app --host 127.0.0.1 --port 8000
   ```
4. The `/api/v1/health` endpoint and frontend status pill will immediately switch from `Dev Preview` to `Model Ready` (`model_mode: "real_inference"`), executing actual deep learning predictions.

---

## 8. API Contract Documentation

### Health Check
- **Endpoint**: `GET /api/v1/health`
- **Response**:
```json
{
  "status": "healthy",
  "is_model_loaded": false,
  "model_mode": "simulated_development",
  "model_name": "DermaScan-Dev-Simulation",
  "version": "0.9.0-dev",
  "supported_classes": [
    { "code": "akiec", "name": "Actinic Keratosis / Intraepithelial Carcinoma", "category": "Pre-cancerous / Non-invasive" },
    { "code": "bcc", "name": "Basal Cell Carcinoma", "category": "Malignant Non-Melanoma" },
    { "code": "bkl", "name": "Benign Keratosis-like Lesions", "category": "Benign" },
    { "code": "df", "name": "Dermatofibroma", "category": "Benign" },
    { "code": "mel", "name": "Melanoma", "category": "Malignant Melanocytic" },
    { "code": "nv", "name": "Melanocytic Nevi", "category": "Benign" },
    { "code": "vasc", "name": "Vascular Lesions", "category": "Benign / Reactive" }
  ],
  "timestamp": "2026-10-22T06:16:46.412633+00:00"
}
```

### Lesion Prediction
- **Endpoint**: `POST /api/v1/predict`
- **Request**: `multipart/form-data` with field `file` (JPEG or PNG, max 10MB).
- **Response**:
```json
{
  "scan_id": "scan_d557a1d3683b",
  "created_at": "2026-10-22T06:21:15.981027+00:00",
  "prediction": {
    "class_name": "Basal Cell Carcinoma",
    "class_code": "bcc",
    "confidence": 0.779,
    "category": "Malignant Non-Melanoma",
    "severity_hint": "high",
    "description": "Basal cell carcinoma is the most common form of skin cancer...",
    "screening_guidance": "Timely specialist evaluation by a dermatologist is recommended...",
    "probabilities": [
      { "code": "bcc", "name": "Basal Cell Carcinoma", "probability": 0.779, "severity": "high" },
      { "code": "bkl", "name": "Benign Keratosis-like Lesions", "probability": 0.0541, "severity": "low" }
    ]
  },
  "model": {
    "name": "DermaScan-Dev-Simulation",
    "version": "0.9.0-dev",
    "architecture": "Simulated-Heuristic (Dev Preview Mode)",
    "is_simulated": true,
    "notice": "DEVELOPMENT PREVIEW MODE: Model weights artifact..."
  },
  "filename": "lesion.jpg",
  "file_size_bytes": 2743,
  "image_data_url": "data:image/jpeg;base64,..."
}
```

### Scan History
- `GET /api/v1/scans`: Returns list of previous scans.
- `GET /api/v1/scans/{scan_id}`: Retrieves specific scan result.
- `DELETE /api/v1/scans/{scan_id}`: Purges scan record and cached preview.

---

## 9. Running Tests

### Backend Tests
Execute the Python test suite:
```bash
cd backend
python test_api.py
```
*Executes 7 integration tests covering health check, valid image upload, empty file handling (400), unsupported format handling (400), history retrieval, and record deletion.*

### Frontend Tests
Execute the Vitest component and validation test suite:
```bash
cd frontend
npm test
```
*Executes 21 unit tests covering file validation (type, size, empty files), formatting utilities, severity mapping, button loading/disabled states, alert components, prediction cards, and clinical protocol cards.*

---

## 10. Building for Production

To create an optimized production build of the frontend:
```bash
cd frontend
npm run build
```
The output bundle will be generated in `frontend/dist/`.

---

## 11. Known Academic Limitations

1. **Benchmark Bias**: HAM10000 data reflects predominantly Caucasian skin phototypes (Fitzpatrick I–III). Predictions may show reduced performance on darker skin tones (Fitzpatrick IV–VI).
2. **Artifact Sensitivity**: Dense hair, surgical marker ink, specular glare, or severe motion blur may distort convolutional feature activations.
3. **Screening Prototype**: This software is not FDA/CE cleared for medical diagnosis and must never be used as a standalone diagnostic tool.
