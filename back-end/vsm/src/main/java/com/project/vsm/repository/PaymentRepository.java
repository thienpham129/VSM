package com.project.vsm.repository;

import com.project.vsm.model.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity , Long> {
    Optional<PaymentEntity> findByPaymentName (String paymentName);
}
