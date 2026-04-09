package com.donatehub.api.controller;

import com.donatehub.api.dto.DonationRequest;
import com.donatehub.api.dto.DonationResponse;
import com.donatehub.api.service.DonationService;
import com.donatehub.api.entity.Donation;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/donations")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "*"})
public class DonationController {

    private final DonationService donationService;

    public DonationController(DonationService donationService) {
        this.donationService = donationService;
    }

    /* ─── Food Donations ─── */
    @PostMapping("/food")
    public ResponseEntity<?> createFoodDonation(
            @RequestBody Map<String, Object> request) {
        try {
            Long userId = Long.parseLong(request.get("userId").toString());
            Double riceQty = Double.parseDouble(request.get("riceQty").toString());
            Double vegQty = Double.parseDouble(request.get("vegQty").toString());
            
            DonationResponse response = donationService.createFoodDonation(userId, riceQty, vegQty);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/food/user/{userId}")
    public ResponseEntity<List<DonationResponse>> getFoodDonationsByUser(@PathVariable Long userId) {
        List<DonationResponse> response = donationService.getFoodDonationsByUser(userId);
        return ResponseEntity.ok(response);
    }

    /* ─── Money Donations ─── */
    @PostMapping("/money")
    public ResponseEntity<?> createMoneyDonation(
            @RequestBody Map<String, Object> request) {
        try {
            Long userId = Long.parseLong(request.get("userId").toString());
            Double amount = Double.parseDouble(request.get("amount").toString());
            String transactionId = request.get("transactionId").toString();
            
            DonationResponse response = donationService.createMoneyDonation(userId, amount, transactionId);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/money/user/{userId}")
    public ResponseEntity<List<DonationResponse>> getMoneyDonationsByUser(@PathVariable Long userId) {
        List<DonationResponse> response = donationService.getMoneyDonationsByUser(userId);
        return ResponseEntity.ok(response);
    }

    /* ─── Clothing Donations ─── */
    @PostMapping("/clothing")
    public ResponseEntity<?> createClothingDonation(
            @RequestBody Map<String, Object> request) {
        try {
            Long userId = Long.parseLong(request.get("userId").toString());
            Integer targetAge = Integer.parseInt(request.get("targetAge").toString());
            Integer quantity = Integer.parseInt(request.get("quantity").toString());
            String condition = request.get("condition").toString();
            
            DonationResponse response = donationService.createClothingDonation(userId, targetAge, quantity, condition);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/clothing/user/{userId}")
    public ResponseEntity<List<DonationResponse>> getClothingDonationsByUser(@PathVariable Long userId) {
        List<DonationResponse> response = donationService.getClothingDonationsByUser(userId);
        return ResponseEntity.ok(response);
    }

    /* ─── Generic Donation Endpoints ─── */
    @PostMapping
    public ResponseEntity<?> createDonation(@RequestBody DonationRequest request) {
        try {
            DonationResponse response = donationService.createDonation(request.getUserId(), request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<DonationResponse> getDonation(@PathVariable Long id) {
        DonationResponse response = donationService.getDonationById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<DonationResponse>> getUserDonations(@PathVariable Long userId) {
        List<DonationResponse> response = donationService.getUserDonations(userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<DonationResponse>> getAllDonations() {
        List<DonationResponse> response = donationService.getAllDonations();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<DonationResponse>> getDonationsByType(@PathVariable String type) {
        List<DonationResponse> response = donationService.getDonationsByType(type);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<DonationResponse>> getDonationsByStatus(@PathVariable String status) {
        List<DonationResponse> response = donationService.getDonationsByStatus(status);
        return ResponseEntity.ok(response);
    }

    /* ─── Admin Actions ─── */
    @PutMapping("/{id}/approve")
    public ResponseEntity<DonationResponse> approveDonation(@PathVariable Long id) {
        DonationResponse response = donationService.approveDonation(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<DonationResponse> rejectDonation(@PathVariable Long id) {
        DonationResponse response = donationService.rejectDonation(id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDonation(@PathVariable Long id) {
        donationService.deleteDonation(id);
        return ResponseEntity.noContent().build();
    }
}
