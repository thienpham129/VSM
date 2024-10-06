package com.project.vsm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.vsm.controller.model.CarEntity;

@Repository
public interface CarRepository extends JpaRepository<CarEntity, Long> {

}
