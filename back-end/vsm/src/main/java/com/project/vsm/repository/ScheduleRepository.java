package com.project.vsm.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.vsm.model.ScheduleEntity;

@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleEntity, Long> {

	@Query("SELECT s FROM ScheduleEntity s WHERE s.car.id = :carId AND ABS(TIMESTAMPDIFF(HOUR, s.startTime, :startTime)) < 3")
	List<ScheduleEntity> findConflictingSchedules(@Param("carId") Long carId,
			@Param("startTime") LocalDateTime startTime);

	@Query("SELECT s FROM ScheduleEntity s WHERE s.account.id = :accountId AND ABS(TIMESTAMPDIFF(HOUR, s.startTime, :startTime)) < 3")
	List<ScheduleEntity> findConflictingSchedulesByAccount(@Param("accountId") Long accountId,
			@Param("startTime") LocalDateTime startTime);

	@Query("""
			    SELECT s
			    FROM ScheduleEntity s
			    WHERE s.car.id = :carId
			      AND DATE(s.startTime) = DATE(:startTime)
			      AND s.startTime < :startTime
			    ORDER BY s.startTime DESC
			""")
	List<ScheduleEntity> findClosestScheduleSameDay(@Param("carId") Long carId,
			@Param("startTime") LocalDateTime startTime);

	@Query("""
			    SELECT s
			    FROM ScheduleEntity s
			    WHERE s.account.id = :driverId
			      AND DATE(s.startTime) = DATE(:startTime)
			      AND s.startTime < :startTime
			    ORDER BY s.startTime DESC
			""")
	List<ScheduleEntity> findClosestScheduleSameDayByDriver(@Param("driverId") Long driverId,
			@Param("startTime") LocalDateTime startTime);

	List<ScheduleEntity> findByCar_CarIdOrAccount_Id(Long carId, Long accountId);

	@Query("SELECT s FROM ScheduleEntity s WHERE (DATE(s.startTime) = :startDate AND s.account.id = :driverId) "
			+ "OR (DATE(s.startTime) = :startDate AND s.car.id = :carId)")
	List<ScheduleEntity> findSchedulesByDriverOrCarForDate(@Param("driverId") Long driverId, @Param("carId") Long carId,
			@Param("startDate") LocalDate startDate);

	List<ScheduleEntity> findByAccount_Id(Long accountId);

	Optional<ScheduleEntity> findByAccount_IdAndStartTime(Long accountId, LocalDateTime startTime);

}