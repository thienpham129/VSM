package com.project.vsm.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.vsm.model.TicketEntity;

@Repository
public interface TicketRepository extends JpaRepository<TicketEntity, String> {
	@Query("select t from TicketEntity  t where t.scheduleEntity.id = ?1")
	List<TicketEntity> getTicketByScheduleId(long scheduleId);

	Optional<TicketEntity> findByTicketId (String ticketId);

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

	@Query("SELECT COALESCE(SUM(t.price), 0) FROM TicketEntity t WHERE YEAR(t.scheduleEntity.startTime) = :year AND MONTH(t.scheduleEntity.startTime) = :month AND t.isPaid = true")
	double sumRevenueByMonth(@Param("year") int year, @Param("month") int month);

	@Query("SELECT COUNT(t) FROM TicketEntity t JOIN t.scheduleEntity s WHERE EXTRACT(MONTH FROM s.startTime) = :month AND EXTRACT(YEAR FROM s.startTime) = :year")
	long countTicketsByMonthAndYear(int month, int year);
}

