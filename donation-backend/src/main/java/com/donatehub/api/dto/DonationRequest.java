package com.donatehub.api.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuppressWarnings("all")
public class DonationRequest {
    @NotNull(message = "Donation type is required")
    private String type; // FOOD, CLOTHING, MONEY

    // For food donations
    private Integer riceQuantity;
    private Integer vegetableQuantity;

    // For clothing donations
    private String targetAgeGroup;
    private Integer clothingQuantity;

    // For money donations
    @Positive(message = "Amount must be positive")
    private BigDecimal amount;

    private String description;
}
