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
}