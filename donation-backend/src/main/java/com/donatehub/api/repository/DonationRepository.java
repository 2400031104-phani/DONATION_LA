package com.donatehub.api.repository;

import com.donatehub.api.entity.Donation;
import com.donatehub.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {
    List<Donation> findByDonor(User donor);
    List<Donation> findByStatus(Donation.DonationStatus status);
    List<Donation> findByType(Donation.DonationType type);
    List<Donation> findByDonorAndStatus(User donor, Donation.DonationStatus status);
}
