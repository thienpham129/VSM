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
	@Query("SELECT s FROM ScheduleEntity s " + "WHERE s.account.id = :accountId " + "AND s.status = 'Đang chạy' "
			+ "AND (" + "    (s.startTime <= :currentTime AND " + "     (SELECT COUNT(ss) FROM ScheduleEntity ss "
			+ "      WHERE ss.account.id = :accountId " + "      AND ss.status = 'Đang chạy' "
			+ "      AND ss.startTime > s.startTime AND ss.startTime <= :currentTime) = 0) "
			+ "    OR s.startTime > :currentTime " + ") " + "ORDER BY s.startTime ASC")
	List<ScheduleEntity> findCurrentOrNextRunningSchedules(@Param("accountId") Long accountId,
			@Param("currentTime") LocalDateTime currentTime);

	@Query("SELECT s FROM ScheduleEntity s " + "WHERE s.account.id = :accountId " + "AND DATE(s.startTime) = :day")
	List<ScheduleEntity> findSchedulesByDayAndAccountId(@Param("day") LocalDate day,
			@Param("accountId") Long accountId);

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

	@Query(value = "select s from ScheduleEntity s where s.startLocation = ?1 and s.stopLocation = ?2 "
			+ "and DATE (s.startTime) = DATE(?3)")
	List<ScheduleEntity> findStartLocationStopLocationStartTime(String startLocation, String stopLocation,
			LocalDate startTime);

	@Query("SELECT s FROM ScheduleEntity s WHERE (DATE(s.startTime) = :startDate AND s.account.id = :driverId) "
			+ "OR (DATE(s.startTime) = :startDate AND s.car.id = :carId)")
	List<ScheduleEntity> findSchedulesByDriverOrCarForDate(@Param("driverId") Long driverId, @Param("carId") Long carId,
			@Param("startDate") LocalDate startDate);

	List<ScheduleEntity> findByAccount_Id(Long accountId);

	Optional<ScheduleEntity> findByAccount_IdAndStartTime(Long accountId, LocalDateTime startTime);

	@Query("SELECT s FROM ScheduleEntity s WHERE s.route.id = :routeId AND DATE(s.startTime) = :startTime")
	List<ScheduleEntity> findByRouteIdAndStartTime(@Param("routeId") long routeId,
			@Param("startTime") LocalDate startTime);

	@Query("SELECT CONCAT(s.account.firstName, ' ', s.account.lastName) AS driverName, "
			+ "MONTH(s.startTime) AS month, COUNT(s.id) AS tripCount " + "FROM ScheduleEntity s "
			+ "WHERE YEAR(s.startTime) = :year " + "GROUP BY s.account.id, MONTH(s.startTime) "
			+ "ORDER BY s.account.id, MONTH(s.startTime)")
	List<Object[]> findDriverScheduleCountByMonth(@Param("year") int year);

	@Query("SELECT COUNT(s) FROM ScheduleEntity s WHERE EXTRACT(MONTH FROM s.startTime) = :month AND EXTRACT(YEAR FROM s.startTime) = :year")
	long countSchedulesByMonthAndYear(int month, int year);

	@Query("SELECT COUNT(s) FROM ScheduleEntity s WHERE EXTRACT(MONTH FROM s.startTime) = :prevMonth AND EXTRACT(YEAR FROM s.startTime) = :year")
	long countSchedulesByPreviousMonthAndYear(int prevMonth, int year);
}