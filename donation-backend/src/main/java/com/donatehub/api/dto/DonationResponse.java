package com.donatehub.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SuppressWarnings("all")
public class DonationResponse {
    private Long id;
    private Long userId;
    private String donorName;
    private String type;
    private String status;
    private String description;
    private Integer riceQuantity;
    private Integer vegetableQuantity;
    private String targetAgeGroup;
    private Integer clothingQuantity;
    private BigDecimal amount;
    private String transactionId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime approvedAt;
}
