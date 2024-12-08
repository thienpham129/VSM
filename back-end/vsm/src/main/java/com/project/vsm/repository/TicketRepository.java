package com.project.vsm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.vsm.model.TicketEntity;

@Repository
public interface TicketRepository extends JpaRepository<TicketEntity, Long> {
	@Query("select t from TicketEntity  t where t.scheduleEntity.id = ?1")
	List<TicketEntity> getTicketByScheduleId(long scheduleId);

	@Query("SELECT CONCAT(s.account.firstName, ' ', s.account.lastName) AS driverName, "
			+ "MONTH(s.startTime) AS month, COUNT(DISTINCT s.id) AS tripCount " + "FROM TicketEntity t "
			+ "JOIN t.scheduleEntity s " + "WHERE YEAR(s.startTime) = :year "
			+ "GROUP BY s.account.id, MONTH(s.startTime) " + "ORDER BY s.account.id, MONTH(s.startTime)")
	List<Object[]> findDriverTripCountByMonth(@Param("year") int year);

	@Query("SELECT CONCAT(r.startLocation, ' → ', r.stopLocation) AS routeLabel, "
			+ "MONTH(s.startTime) AS month, COUNT(t) AS ticketCount " + "FROM TicketEntity t "
			+ "JOIN t.scheduleEntity s " + "JOIN s.route r "
			+ "GROUP BY r.startLocation, r.stopLocation, MONTH(s.startTime) "
			+ "ORDER BY r.startLocation, r.stopLocation, MONTH(s.startTime)")
	List<Object[]> countTicketsByRouteAndMonth();
}
