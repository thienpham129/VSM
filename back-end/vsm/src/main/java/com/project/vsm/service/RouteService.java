package com.project.vsm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.vsm.model.RouteEntity;
import com.project.vsm.repository.RouteRepository;

@Service
public class RouteService {
	
	@Autowired
	private RouteRepository routeRepository;
	
	public Iterable<RouteEntity> getAllRoutes() {
		Iterable<RouteEntity> listRoutes = routeRepository.findAll();
		return listRoutes;
	}
}
