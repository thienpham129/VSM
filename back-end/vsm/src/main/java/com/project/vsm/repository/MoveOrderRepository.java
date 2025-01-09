package com.project.vsm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.vsm.model.MoveOrderEntity;

public interface MoveOrderRepository extends JpaRepository<MoveOrderEntity, Long> {

	MoveOrderEntity findBySchedule_Id(Long scheduleId);
}
