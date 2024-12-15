package com.project.vsm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.vsm.model.CarEntity;
import com.project.vsm.model.CarImageEntity;

@Repository
public interface CarImageRepository extends JpaRepository<CarImageEntity, Long> {
	@Query("SELECT ci FROM CarImageEntity ci WHERE ci.car = :car")
    List<CarImageEntity> findByCar(@Param("car") CarEntity car);
}