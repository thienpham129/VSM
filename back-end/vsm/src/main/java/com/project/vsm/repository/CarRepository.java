package com.project.vsm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.project.vsm.model.CarEntity;

@Repository
public interface CarRepository extends JpaRepository<CarEntity, Long> , JpaSpecificationExecutor<CarEntity> {

	List<CarEntity> findByType_TypeId(Long typeId);
}
