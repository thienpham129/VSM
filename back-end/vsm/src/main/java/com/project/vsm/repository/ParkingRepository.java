package com.project.vsm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.vsm.controller.model.ParkingEntity;

@Repository
public interface ParkingRepository extends JpaRepository<ParkingEntity, Long> {

}
