package com.donatehub.api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "donations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SuppressWarnings({"all", "unused"})
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User donor;

    @Column(nullable = false, columnDefinition = "VARCHAR(20)")
    @Enumerated(EnumType.STRING)
    private DonationType type;

    @Column(nullable = false, columnDefinition = "VARCHAR(20)")
    @Enumerated(EnumType.STRING)
    private DonationStatus status;

    @Column(columnDefinition = "TEXT")
    private String description;

    // For food donations
    @Column(name = "rice_quantity")
    private Integer riceQuantity;

    @Column(name = "vegetable_quantity")
    private Integer vegetableQuantity;

    // For clothing donations
    @Column(name = "target_age_group")
    private String targetAgeGroup;

    @Column(name = "clothing_quantity")
    private Integer clothingQuantity;

    // For money donations
    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "transaction_id")
    private String transactionId;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "approved_at")
    private LocalDateTime approvedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        status = DonationStatus.PENDING;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum DonationType {
        FOOD, CLOTHING, MONEY, APPAREL
    }

    public enum DonationStatus {
        PENDING, APPROVED, REJECTED, COMPLETED
    }
}
