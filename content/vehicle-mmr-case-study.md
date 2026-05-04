As you can see from the graphs above, the model with random crops was able to achieve a much better accuracy, with a final accuracy of **35.35%**, compared to the normal ProtoNet model, which was only able to achieve **27.64%**. Although it still showed the same characteristics of overfitting, where the validation accuracy started to drop after half-way through training.

### Table 4.1: Results of the different few-shot learning models on the Stanford Cars dataset.

| Model | 5-way 5-shot | 5-way 1-shot |
|---|---|---|
| Meta-Baseline | 38.28 ± 1.91 | — |
| Baseline++ | 31.97 ± 1.24 | 23.92 ± 1.17 |
| ProtoNet | 27.51 ± 1.13 | 27.64 ± 1.33 |
| ProtoNet + Random Crop | — | 35.35 ± 1.21 |
| RelationNet | 25.32 ± 1.02 | 22.03 ± 0.93 |
| Negative Margin | 27.97 ± 1.19 | 23.63 ± 1.11 |

> **Note:** The blanks in Table 4.1 are due to the models not being trained on that particular setup. Meta-Baseline was omitted due to its extensive time period needed to train sufficiently. Similarly, ProtoNet was not trained on the 5-way 5-shot setup with random crops, due to time constraints.

---

### Table 4.2: Best Accuracy across the CLIP, Tip-Adapter and Tip-Adapter-F.

| Shots | Zero-Shot CLIP | Tip-Adapter | Tip-Adapter-F |
|---|---|---|---|
| 5 | 55.64% | 61.98% | 66.35% |
| 8 | 55.64% | 62.93% | 68.93% |
| 12 | 55.64% | 64.87% | 72.94% |
| 16 | 55.64% | 66.75% | 74.97% |

---

### Table 4.3: Number of instances for each category in the Car Parts dataset.

| Category | # Instances | Category | # Instances | Category | # Instances |
|---|---|---|---|---|---|
| Back Bumper | 909 | Back Door | 1,425 | Back Wheel | 1,677 |
| Back Window | 2,394 | Back Windshield | 574 | Fender | 1,820 |
| Front Bumper | 1,358 | Front Door | 1,779 | Front Wheel | 1,723 |
| Front Window | 1,859 | Grille | 1,079 | Headlight | 1,742 |
| Hood | 1,375 | License Plate | 743 | Mirror | 1,892 |
| Quarter Panel | 1,659 | Rocker Panel | 1,677 | Roof | 1,531 |
| Tail Light | 1,504 | Trunk | 852 | Windshield | 1,200 |
| **Total** | **30,772** | | | | |

## 4.2.1 Car Parts Detection

Using the Car Parts detection, multiple different object detection models were evaluated.

<!-- ADD ARCHITECTURE DIAGRAM IMAGE HERE -->
<!-- Upload the diagram image to Sanity and paste the URL below: -->
<!-- ![PartGraph Architecture Diagram](IMAGE_URL_HERE) -->

### Table 4.4: Best Results for the Instance Segmentation Models on masks (mAP).

| Model | mAP | mAP50 | mAP75 | mAPs | mAPm | mAPl |
|---|---|---|---|---|---|---|
| Mask R-CNN | 31.10% | 46.00% | 36.00% | 12.50% | 24.60% | 36.60% |
| RTMDet | 37.90% | 49.50% | 41.00% | 4.60% | 26.20% | 44.80% |
| YOLOv5 | 32.40% | 48.00% | 33.50% | 3.40% | 24.10% | 38.70% |

For the bounding-box mAP, the results improved significantly, with the best performing instance segmentation model being Mask R-CNN, giving a mAP of **69.80%** and **91.30%** for mAP when using an IoU threshold of 50.

Following this, the bounding boxes to crop the images to the respective car parts were used when constructing the graphs, instead of using the masks — which, due to the low mAP, would not give an accurate representation of the cars and may have caused problems with overfitting, or the model being unable to learn properly.

### Table 4.5: Best Results for the bounding boxes (mAP).

| Model | mAP | mAP50 | mAP75 | mAPs | mAPm | mAPl |
|---|---|---|---|---|---|---|
| Mask R-CNN | 69.80% | 91.30% | 77.70% | 28.20% | 59.00% | 75.30% |
| RTMDet | 63.70% | 87.20% | 71.20% | 17.20% | 51.30% | 70.00% |
| YOLOv5 | 59.50% | 83.90% | 66.20% | 6.80% | 44.70% | 68.40% |
| Rank Detr | 76.14% | 94.08% | 83.76% | 45.83% | 64.52% | 83.87% |

---

### Table 5.1: Comprehensive comparison of all VMMR accuracies, including state-of-the-art methods.

| Method | 1-shot | 5-shot | 8-shot | 12-shot | 16-shot |
|---|---|---|---|---|---|
| **Traditional Few-Shot Methods (5-way)** | | | | | |
| Meta-Baseline (Chen et al., 2021) | — | 38.28 | — | — | — |
| Baseline++ (Chen et al., 2020b) | 23.92 | 31.97 | — | — | — |
| ProtoNet (Snell, Swersky and Zemel, 2017) | 27.64 | 27.51 | — | — | — |
| ProtoNet + Random Crop | 35.35 | — | — | — | — |
| RelationNet (Sung et al., 2018) | 22.03 | 25.32 | — | — | — |
| Negative Margin (Liu et al., 2020) | 23.63 | 27.97 | — | — | — |
| **CLIP-Based Methods** | | | | | |
| Zero-Shot CLIP | 55.64 | 55.64 | 55.64 | 55.64 | 55.64 |
| Tip-Adapter | — | 61.98 | 62.93 | 64.87 | 66.75 |
| Tip-Adapter-F | — | 66.35 | 68.93 | 72.94 | 74.97 |
| **Graph-Based Methods (PartGraph) (5-way)** | | | | | |
| CLIP + RTMDet | — | 20.11 | — | — | — |
| CLIP + Rank Detr | — | 19.89 | — | — | — |
| CLIP + PCA + Rank Detr | — | 19.77 | — | — | — |
| CLIP + Global-Local + Rank Detr | — | 19.61 | — | — | — |
| **State-of-the-Art from Literature (5-way)** | | | | | |
| Liu et al. (2024)* | 91.37 | 98.63 | — | — | — |
| Chen et al. (2020a)* | 73.15 | 91.89 | — | — | — |
| Li et al. (2019)* | 61.51 | 89.60 | — | — | — |
| Li et al. (2023)* | 76.81 | 88.21 | — | — | — |

> \* Results reported in literature, not reproduced in this work.
