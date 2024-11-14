package com.project.vsm.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.vsm.model.AccountEntity;
import com.project.vsm.model.CarEntity;
import com.project.vsm.model.ScheduleEntity;

@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleEntity, Long> {

	// Tìm các lịch trình theo xe và thời gian bắt đầu
    List<ScheduleEntity> findByCarAndStartTime(CarEntity car, LocalDateTime startTime);

    // Tìm các lịch trình theo tài xế và thời gian bắt đầu
    List<ScheduleEntity> findByAccountAndStartTime(AccountEntity account, LocalDateTime startTime);

    // Tìm các lịch trình theo tài xế hoặc xe trong một ngày cụ thể
    @Query("SELECT s FROM ScheduleEntity s WHERE (DATE(s.startTime) = :startDate AND s.account.id = :driverId) "
            + "OR (DATE(s.startTime) = :startDate AND s.car.id = :carId)")
    List<ScheduleEntity> findSchedulesByDriverOrCarForDate(@Param("driverId") Long driverId, @Param("carId") Long carId,
            @Param("startDate") LocalDate startDate);

    // Tìm lịch trình gần nhất trước startTime của xe hoặc tài xế trong cùng ngày
    @Query("SELECT s FROM ScheduleEntity s WHERE (s.car.id = :carId OR s.account.id = :driverId) "
            + "AND DATE(s.startTime) = :date " + "AND s.startTime < :startTime " + "ORDER BY s.startTime DESC")
    Optional<ScheduleEntity> findPreviousScheduleForCarOrDriver(@Param("carId") Long carId,
            @Param("driverId") Long driverId, @Param("date") LocalDate date,
            @Param("startTime") LocalDateTime startTime);

    // Tìm lịch trình của tài xế hoặc xe trong ngày (chỉ xét ngày)
    @Query("SELECT s FROM ScheduleEntity s WHERE (s.car.id = :carId OR s.account.id = :driverId) AND DATE(s.startTime) = :startDate")
    List<ScheduleEntity> findSchedulesForCarOrDriver(@Param("carId") Long carId, @Param("driverId") Long driverId,
            @Param("startDate") LocalDate startDate);

    // Tìm các lịch trình theo startDate (chỉ xét ngày)
    @Query("SELECT s FROM ScheduleEntity s WHERE DATE(s.startTime) = :inputDate")
    List<ScheduleEntity> findByStartTimeDate(@Param("inputDate") LocalDate inputDate);

    // Tìm các lịch trình của xe hoặc tài xế trong ngày với startTime khác
    @Query("SELECT s FROM ScheduleEntity s WHERE (s.car.id = :carId OR s.account.id = :driverId) "
            + "AND DATE(s.startTime) = :startDate "
            + "AND ABS(TIMESTAMPDIFF(MINUTE, s.startTime, :startTime)) >= 180")
    List<ScheduleEntity> findSchedulesWithStartTimeDifference(@Param("carId") Long carId, @Param("driverId") Long driverId,
            @Param("startDate") LocalDate startDate, @Param("startTime") LocalDateTime startTime);

}
