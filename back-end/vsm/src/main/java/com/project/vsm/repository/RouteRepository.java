package com.project.vsm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.vsm.model.RouteEntity;

@Repository
public interface RouteRepository extends JpaRepository<RouteEntity, Long> {

}
