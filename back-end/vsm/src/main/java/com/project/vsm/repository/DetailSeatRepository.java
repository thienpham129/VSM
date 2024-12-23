package com.project.vsm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.vsm.model.DetailSeat;

@Repository
public interface DetailSeatRepository extends JpaRepository<DetailSeat, Long> {
	void deleteByTypeEntityId(long idType);
}
