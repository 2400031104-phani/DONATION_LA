package com.donatehub.api.service;

import com.donatehub.api.dto.DonationRequest;
import com.donatehub.api.dto.DonationResponse;
import com.donatehub.api.entity.Donation;
import com.donatehub.api.entity.User;
import com.donatehub.api.exception.BadRequestException;
import com.donatehub.api.exception.ResourceNotFoundException;
import com.donatehub.api.repository.DonationRepository;
import com.donatehub.api.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@SuppressWarnings("all")
public class DonationService {

    private final DonationRepository donationRepository;
    private final UserRepository userRepository;

    public DonationService(DonationRepository donationRepository, UserRepository userRepository) {
        this.donationRepository = donationRepository;
        this.userRepository = userRepository;
    }

    public DonationResponse createDonation(Long userId, DonationRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Donation.DonationType donationType;
        try {
            donationType = Donation.DonationType.valueOf(request.getType().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid donation type: " + request.getType());
        }

        Donation donation = Donation.builder()
                .donor(user)
                .type(donationType)
                .status(Donation.DonationStatus.PENDING)
                .description(request.getDescription())
                .riceQuantity(request.getRiceQuantity())
                .vegetableQuantity(request.getVegetableQuantity())
                .targetAgeGroup(request.getTargetAgeGroup())
                .clothingQuantity(request.getClothingQuantity())
                .amount(request.getAmount())
                .transactionId(UUID.randomUUID().toString())
                .build();

        Donation savedDonation = donationRepository.save(donation);
        return mapToDonationResponse(savedDonation);
    }

    public DonationResponse getDonationById(Long donationId) {
        Donation donation = donationRepository.findById(donationId)
                .orElseThrow(() -> new ResourceNotFoundException("Donation not found with id: " + donationId));
        return mapToDonationResponse(donation);
    }

    public List<DonationResponse> getUserDonations(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        return donationRepository.findByDonor(user)
                .stream()
                .map(this::mapToDonationResponse)
                .collect(Collectors.toList());
    }

    public List<DonationResponse> getDonationsByStatus(String status) {
        Donation.DonationStatus donationStatus;
        try {
            donationStatus = Donation.DonationStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid status: " + status);
        }

        return donationRepository.findByStatus(donationStatus)
                .stream()
                .map(this::mapToDonationResponse)
                .collect(Collectors.toList());
    }

    public List<DonationResponse> getDonationsByType(String type) {
        Donation.DonationType donationType;
        try {
            donationType = Donation.DonationType.valueOf(type.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid donation type: " + type);
        }

        return donationRepository.findByType(donationType)
                .stream()
                .map(this::mapToDonationResponse)
                .collect(Collectors.toList());
    }

    public DonationResponse approveDonation(Long donationId) {
        Donation donation = donationRepository.findById(donationId)
                .orElseThrow(() -> new ResourceNotFoundException("Donation not found with id: " + donationId));

        donation.setStatus(Donation.DonationStatus.APPROVED);
        donation.setApprovedAt(java.time.LocalDateTime.now());

        Donation updatedDonation = donationRepository.save(donation);
        return mapToDonationResponse(updatedDonation);
    }

    public DonationResponse rejectDonation(Long donationId) {
        Donation donation = donationRepository.findById(donationId)
                .orElseThrow(() -> new ResourceNotFoundException("Donation not found with id: " + donationId));

        donation.setStatus(Donation.DonationStatus.REJECTED);

        Donation updatedDonation = donationRepository.save(donation);
        return mapToDonationResponse(updatedDonation);
    }

    public DonationResponse completeDonation(Long donationId) {
        Donation donation = donationRepository.findById(donationId)
                .orElseThrow(() -> new ResourceNotFoundException("Donation not found with id: " + donationId));

        donation.setStatus(Donation.DonationStatus.COMPLETED);

        Donation updatedDonation = donationRepository.save(donation);
        return mapToDonationResponse(updatedDonation);
    }

    public void deleteDonation(Long donationId) {
        Donation donation = donationRepository.findById(donationId)
                .orElseThrow(() -> new ResourceNotFoundException("Donation not found with id: " + donationId));

        donationRepository.delete(donation);
    }

    public List<DonationResponse> getAllDonations() {
        return donationRepository.findAll()
                .stream()
                .map(this::mapToDonationResponse)
                .collect(Collectors.toList());
    }

    private DonationResponse mapToDonationResponse(Donation donation) {
        return DonationResponse.builder()
                .id(donation.getId())
                .userId(donation.getDonor().getId())
                .donorName(donation.getDonor().getFirstName() + " " + donation.getDonor().getLastName())
                .type(donation.getType().name())
                .status(donation.getStatus().name())
                .description(donation.getDescription())
                .riceQuantity(donation.getRiceQuantity())
                .vegetableQuantity(donation.getVegetableQuantity())
                .targetAgeGroup(donation.getTargetAgeGroup())
                .clothingQuantity(donation.getClothingQuantity())
                .amount(donation.getAmount())
                .transactionId(donation.getTransactionId())
                .createdAt(donation.getCreatedAt())
                .updatedAt(donation.getUpdatedAt())
                .approvedAt(donation.getApprovedAt())
                .build();
    }
}
