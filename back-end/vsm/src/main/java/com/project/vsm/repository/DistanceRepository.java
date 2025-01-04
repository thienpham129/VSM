package com.project.vsm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.vsm.model.DistanceEntity;

@Repository
public interface DistanceRepository extends JpaRepository<DistanceEntity, Long> {
	List<DistanceEntity> findByScheduleId(Long scheduleId);
}