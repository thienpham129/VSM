package com.project.vsm.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.vsm.model.CarRouteEntity;
import com.project.vsm.model.ScheduleEntity;

@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleEntity, Long> {
	@Query("SELECT s FROM ScheduleEntity s " + "WHERE s.carRoute = :carRoute "
			+ "AND s.startTime BETWEEN :minTime AND :maxTime " + "AND s.status = 'Đã lên lịch' "
			+ "AND s.emptySeat > 0")
	List<ScheduleEntity> findScheduleByCarRouteAndTimeRange(@Param("carRoute") CarRouteEntity carRoute,
			@Param("minTime") LocalDateTime minTime, @Param("maxTime") LocalDateTime maxTime);

	@Query("""
			    SELECT s FROM ScheduleEntity s
			    WHERE s.startTime BETWEEN :startTimeRange AND :endTimeRange
			    AND s.carRoute.route.id = :routeId
			""")
	List<ScheduleEntity> findSchedulesByTimeRangeAndRoute(LocalDateTime startTimeRange, LocalDateTime endTimeRange,
			Long routeId);

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