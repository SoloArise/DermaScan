
# DermaScan - Model Training Experiments

## Overview

This document records the deep learning model experiments conducted for the DermaScan skin lesion screening project.

The experiments explore transfer learning approaches for multiclass skin lesion classification using dermoscopic images from the ISIC 2019 dataset.

## Dataset

- Dataset: ISIC 2019
- Classification: 8 classes
- Images were resized according to the input requirements of each model.

## Model 1: EfficientNet-B3

- Architecture: EfficientNet-B3
- Training epochs: 20
- Input image size: 300 x 300

### Evaluation Results

| Metric | Score |
|---|---:|
| Accuracy | 86.08% |
| Balanced Accuracy | 82.68% |
| Macro F1-score | 80.48% |
| Macro AUC (OvR) | 0.9423 |

## Model 2: ResNet50

- Architecture: ResNet50
- Training epochs: 30
- Input image size: 224 x 224

### Evaluation Results

| Metric | Score |
|---|---:|
| Accuracy | 83.92% |
| Balanced Accuracy | 81.63% |
| Macro Precision | 76.64% |
| Macro Recall | 81.63% |
| Macro F1-score | 78.87% |
| Macro AUC (OvR) | 0.9433 |

## Observations

- EfficientNet-B3 achieved higher accuracy, balanced accuracy and macro F1-score in these experiments.
- ResNet50 achieved a slightly higher macro AUC score.
- Both architectures demonstrated the potential of transfer learning for skin lesion image classification.

These experiments were conducted with different input image sizes and training epochs. Therefore, the results should not be treated as a controlled architecture comparison.

## Additional Evaluation

The model evaluation work also includes:

- Confusion matrix analysis.
- Class-wise performance evaluation.
- Grad-CAM visualizations for model interpretability.

Grad-CAM highlights image regions that influence model predictions. It does not establish medical correctness.

## Integration Status

These are experimental models trained using ISIC 2019. They are not yet confirmed as the deployed models in the DermaScan application.

The current backend documentation specifies a seven-class HAM10000-compatible model. Model integration requires matching the dataset class mapping, output dimensions, input preprocessing and model architecture.

## Disclaimer

These models are experimental academic work intended for research and preliminary screening support. They are not substitutes for professional medical diagnosis.
