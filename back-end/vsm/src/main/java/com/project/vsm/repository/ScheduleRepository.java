package com.project.vsm.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.vsm.model.AccountEntity;
import com.project.vsm.model.CarEntity;
import com.project.vsm.model.ScheduleEntity;

@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleEntity, Long> {

	List<ScheduleEntity> findByCarAndStartTime(CarEntity car, LocalDateTime startTime);

	List<ScheduleEntity> findByAccountAndStartTime(AccountEntity account, LocalDateTime startTime);

	@Query("SELECT s FROM ScheduleEntity s WHERE (DATE(s.startTime) = :startDate AND s.account.id = :driverId) " +
		       "OR (DATE(s.startTime) = :startDate AND s.car.id = :carId)")
		List<ScheduleEntity> findSchedulesByDriverOrCarForDate(@Param("driverId") Long driverId,
		                                                       @Param("carId") Long carId,
		                                                       @Param("startDate") LocalDate startDate);
}
