package com.donatehub.api.controller;

import com.donatehub.api.dto.DonationRequest;
import com.donatehub.api.dto.DonationResponse;
import com.donatehub.api.service.DonationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/donations")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class DonationController {

    private final DonationService donationService;

    public DonationController(DonationService donationService) {
        this.donationService = donationService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('DONOR', 'ADMIN')")
    public ResponseEntity<DonationResponse> createDonation(
            @Valid @RequestBody DonationRequest request,
            Authentication authentication) {
        // Extract user ID from authentication
        Long userId = extractUserIdFromToken(authentication);
        DonationResponse response = donationService.createDonation(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('DONOR', 'ADMIN', 'ORGANIZATION')")
    public ResponseEntity<DonationResponse> getDonation(@PathVariable Long id) {
        DonationResponse response = donationService.getDonationById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('DONOR', 'ADMIN')")
    public ResponseEntity<List<DonationResponse>> getUserDonations(@PathVariable Long userId) {
        List<DonationResponse> response = donationService.getUserDonations(userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('DONOR', 'ADMIN', 'ORGANIZATION')")
    public ResponseEntity<List<DonationResponse>> getAllDonations() {
        List<DonationResponse> response = donationService.getAllDonations();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<DonationResponse>> getDonationsByStatus(@PathVariable String status) {
        List<DonationResponse> response = donationService.getDonationsByStatus(status);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/type/{type}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ORGANIZATION')")
    public ResponseEntity<List<DonationResponse>> getDonationsByType(@PathVariable String type) {
        List<DonationResponse> response = donationService.getDonationsByType(type);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DonationResponse> approveDonation(@PathVariable Long id) {
        DonationResponse response = donationService.approveDonation(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DonationResponse> rejectDonation(@PathVariable Long id) {
        DonationResponse response = donationService.rejectDonation(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/complete")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DonationResponse> completeDonation(@PathVariable Long id) {
        DonationResponse response = donationService.completeDonation(id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteDonation(@PathVariable Long id) {
        donationService.deleteDonation(id);
        return ResponseEntity.noContent().build();
    }

    private Long extractUserIdFromToken(Authentication authentication) {
        // This is a simplified version. In a real application, extract from JWT token
        // For now, returning a placeholder that should be updated based on actual implementation
        return 1L;
    }
}
