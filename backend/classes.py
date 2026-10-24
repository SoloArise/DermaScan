"""
DermaScan Classification Classes and Metadata
Based on the international standard HAM10000 (Human Against Machine with 10000 training images)
benchmark dataset for pigmented skin lesions.
"""

from typing import Dict, Any

HAM10000_CLASSES: Dict[str, Dict[str, Any]] = {
    "akiec": {
        "code": "akiec",
        "name": "Actinic Keratosis / Intraepithelial Carcinoma",
        "category": "Pre-cancerous / Non-invasive",
        "severity": "moderate",
        "summary": "Actinic keratoses (solar keratoses) and intraepithelial carcinoma (Bowen's disease) are common superficial pre-cancerous variants caused by chronic ultraviolet radiation.",
        "screening_guidance": "Consult a dermatologist for clinical examination and dermoscopy. These lesions are frequently treated preventively with cryotherapy, topical field treatments, or curettage.",
        "is_malignant": False,
        "is_precancerous": True,
    },
    "bcc": {
        "code": "bcc",
        "name": "Basal Cell Carcinoma",
        "category": "Malignant Non-Melanoma",
        "severity": "high",
        "summary": "Basal cell carcinoma is the most common form of skin cancer. While slow-growing and rarely metastasizing, it is locally destructive if untreated.",
        "screening_guidance": "Timely specialist evaluation by a dermatologist or oncologic surgeon is recommended for clinical assessment, biopsy confirmation, and definitive surgical or topical management.",
        "is_malignant": True,
        "is_precancerous": False,
    },
    "bkl": {
        "code": "bkl",
        "name": "Benign Keratosis-like Lesions",
        "category": "Benign",
        "severity": "low",
        "summary": "This category encompasses seborrheic keratoses, solar lentigines (age/liver spots), and lichen-planus-like keratoses. These are common non-cancerous skin growths.",
        "screening_guidance": "Typically benign and non-threatening. Routine skin self-checks are recommended; seek clinical evaluation if the lesion changes in color, size, shape, bleeds, or causes discomfort.",
        "is_malignant": False,
        "is_precancerous": False,
    },
    "df": {
        "code": "df",
        "name": "Dermatofibroma",
        "category": "Benign",
        "severity": "low",
        "summary": "Dermatofibromas are benign cutaneous fibrous histiocytomas, often presenting as firm, small nodules on extremities with a characteristic dimple sign upon lateral pinching.",
        "screening_guidance": "Generally harmless with no malignant potential. Medical evaluation is indicated only if symptomatic, rapidly enlarging, or diagnostic uncertainty exists.",
        "is_malignant": False,
        "is_precancerous": False,
    },
    "mel": {
        "code": "mel",
        "name": "Melanoma",
        "category": "Malignant Melanocytic",
        "severity": "urgent_evaluation",
        "summary": "Melanoma is an aggressive malignant neoplasm arising from melanocytes. Early detection and surgical excision before deep dermal invasion are critical for optimal prognosis.",
        "screening_guidance": "Prompt, in-person clinical assessment by a board-certified dermatologist is strongly recommended. Do not delay professional evaluation, dermoscopy, or indicated biopsy.",
        "is_malignant": True,
        "is_precancerous": False,
    },
    "nv": {
        "code": "nv",
        "name": "Melanocytic Nevi",
        "category": "Benign",
        "severity": "low",
        "summary": "Melanocytic nevi (ordinary moles) are benign neoplasms of melanocytes. They are ubiquitous across the population and typically stable in appearance.",
        "screening_guidance": "Benign finding. Continue monitoring using the ABCDE rule (Asymmetry, Border, Color, Diameter, Evolving). Consult a healthcare provider if notable changes occur.",
        "is_malignant": False,
        "is_precancerous": False,
    },
    "vasc": {
        "code": "vasc",
        "name": "Vascular Lesions",
        "category": "Benign / Reactive",
        "severity": "low",
        "summary": "Vascular lesions include cherry angiomas, angiokeratomas, pyogenic granulomas, and vascular malformations originating from blood vessel proliferation.",
        "screening_guidance": "Usually benign. If a lesion bleeds repeatedly, expands rapidly, or displays atypical dermoscopic features, a professional dermatological review is advised.",
        "is_malignant": False,
        "is_precancerous": False,
    },
}

DEFAULT_CLASS_ORDER = ["akiec", "bcc", "bkl", "df", "mel", "nv", "vasc"]
