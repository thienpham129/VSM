package com.project.vsm.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.vsm.model.AccountEntity;
import com.project.vsm.model.CarEntity;
import com.project.vsm.model.ScheduleEntity;

@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleEntity, Long> {

	List<ScheduleEntity> findByCarAndStartTime(CarEntity car, LocalDateTime startTime);

	List<ScheduleEntity> findByAccountAndStartTime(AccountEntity account, LocalDateTime startTime);
}
