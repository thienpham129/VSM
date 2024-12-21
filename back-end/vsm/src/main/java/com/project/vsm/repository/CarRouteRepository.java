package com.project.vsm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.vsm.model.CarRouteEntity;

@Repository
public interface CarRouteRepository extends JpaRepository<CarRouteEntity, Long> {
	boolean existsByCar_CarIdAndRoute_Id(Long carId, Long routeId);
}
