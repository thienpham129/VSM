package com.project.vsm.repository;

import com.project.vsm.model.ScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.vsm.model.RouteEntity;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RouteRepository extends JpaRepository<RouteEntity, Long> {
	boolean existsByStartLocationAndStopLocation(String startLocation, String stopLocation);

	@Query("SELECT DISTINCT r " +
			"FROM ScheduleEntity s JOIN RouteEntity r ON s.route.id = r.id " +
			"WHERE s.id = :scheduleId AND r.id = :routeId " +
			"AND r.startLocation = :startLocation AND r.stopLocation = :stopLocation " +
			"AND DATE(s.startTime) = :startTime")
	List<RouteEntity> findStartLocationStopLocationStartTime(
			@Param("scheduleId") long scheduleId,
			@Param("routeId") long routeId,
			@Param("startLocation") String startLocation,
			@Param("stopLocation") String stopLocation,
			@Param("startTime") LocalDate startTime);


	@Query("SELECT s FROM ScheduleEntity s WHERE s.route.id = :routeId AND DATE(s.startTime) = :startTime")
	List<ScheduleEntity> findByRouteIdAndStartTime(@Param("routeId") long routeId, @Param("startTime") LocalDate startTime);

}
