package com.project.vsm.repository;

import com.project.vsm.model.TicketEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<TicketEntity , Long> {
    @Query("select t from TicketEntity  t where t.scheduleEntity.id = ?1")
    List<TicketEntity> getTicketByScheduleId (long scheduleId);
    
  
}
