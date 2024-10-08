package com.project.vsm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.vsm.model.CarImageEntity;

@Repository
public interface CarImageRepository extends JpaRepository<CarImageEntity, Long> {

}
