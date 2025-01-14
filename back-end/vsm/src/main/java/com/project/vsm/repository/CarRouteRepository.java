package com.project.vsm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.vsm.model.CarEntity;
import com.project.vsm.model.CarRouteEntity;
import com.project.vsm.model.RouteEntity;

@Repository
public interface CarRouteRepository extends JpaRepository<CarRouteEntity, Long> {
	boolean existsByCar_CarIdAndRoute_Id(Long carId, Long routeId);

	@Query("SELECT cr FROM CarRouteEntity cr WHERE cr.car = :car AND cr.route = :route")
	CarRouteEntity findByCarAndRoute(@Param("car") CarEntity car, @Param("route") RouteEntity route);
	
	List<CarRouteEntity> findByRoute_Id(Long routeId);
	
}
